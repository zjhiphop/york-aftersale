import * as React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
    Card,
    Picker,
    WingBlank,
    WhiteSpace,
    List, ActionSheet,
    Modal, Toast,
    PickerView,
    Button, Popover, Icon
} from 'antd-mobile';
const PItem = Popover.Item;
import { seq } from '../utils/misc';
import Mqtt from '../utils/mqtt';
import { EventRegister } from 'react-native-event-listeners'
import {
    composeMQTTPayload,
    CTRL_KEY,
    CFG_KEY,
    TIME_KEY,
    payloadParser,
    MQTT_ACTION,
    errorParser,
    POWER, ACTION_TYPE, MODE
} from '../utils/misc';
import { NavBarButtonPress } from 'react-navigation';
import TextStyles from '../style/text';
import OrderSvc from '../utils/order-svc';
import DvcSvc from '../utils/dvc-svc';
import moment from 'moment';

const Item = List.Item;
const Brief = Item.Brief;
const prompt = Modal.prompt;
const alert = Modal.alert;

const coldInTempRange = seq(21).slice(10).map(item => { return { value: item, label: item } }); // 10-20
const hotInTempRange = seq(48).slice(25).map(item => { return { value: item, label: item } }); // 25 - 47
const coldOutTempRange = seq(16).slice(5).map(item => { return { value: item, label: item } }); // 5-15
const hotOutTempRange = seq(61).slice(30).map(item => { return { value: item, label: item } }); // 30 - 60
const ctrlRange = [{ value: 0, label: '系统回水' }, { value: 1, label: '系统出水' }];
const tempWaterActionRange = [...Array(4).keys()].slice(1).map(item => { return { value: item, label: item } }); // 1-3

const MAC = 'F0FE6B2F980E0000';
const TOPIC_DATA = `/MAC/${MAC}/DA`;
const TOPIC_CTRL = `/MAC/${MAC}/DC`;
const TOPIC_CFG = `/MAC/${MAC}/CFG`;
const TOPIC_DR = `/MAC/${MAC}/DR`;
const TOPIC_ERROR = `/MAC/${MAC}/ERROR`;
const TOPIC_ACK = `/MAC/${MAC}/ACK`;
const customIcon = src => <img src={src} className="am-icon am-icon-xs" alt="icon" />;

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
    wrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}
export default class SettingDetailScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    _data: { _id: null }

    componentWillMount() {

        this.initEvents();
        this.query();

    }

    query() {
        // 查询状态信息
        Mqtt.send(TOPIC_DR, composeMQTTPayload({
            action: MQTT_ACTION.DR,
            MAC: MAC
        }));

        // 查询配置信息
        Mqtt.send(TOPIC_DR, composeMQTTPayload({
            action: MQTT_ACTION.DRCFG,
            MAC: MAC
        }));
    }

    initEvents() {
        EventRegister.on(TOPIC_DATA, payload => {
            let status = payloadParser(payload);

            if (status.actionType === ACTION_TYPE.STATUS) {
                this.setState({ 'status': status });
            } else if (status.actionType === ACTION_TYPE.CONFIG) {

                Object.keys(status.config).forEach(key => {
                    console.log(key, status.config[key])
                    this.setState({ [key]: status.config[key] })
                });
            }

            console.log(this.state.status);
        });

        EventRegister.on(TOPIC_CTRL, payload => {
            console.log('new ctrl read: ', payload);
        });

        EventRegister.on(TOPIC_CFG, payload => {
            console.log('new cfg read: ', payload);
        });

        EventRegister.on(TOPIC_ERROR, payload => {
            console.error('配置出错:', errorParser(payload));
        });

        EventRegister.on(TOPIC_ACK, payload => {
            Toast.show('配置成功！');
        });
    }

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        const BUTTONS = ['初始化', '维修完成', '取消']
        return {
            title: "配置详情",
            headerRight: <View style={{
                height: '100%',
                padding: 15,
                marginRight: 15,
                display: 'flex',
                alignItems: 'center',
            }}
            >
                <Button type="ghost" size="small" onClick={e => {
                    // ActionSheet.showActionSheetWithOptions({
                    //     options: BUTTONS,
                    //     cancelButtonIndex: BUTTONS.length - 1,
                    //     title: '请选择操作类型',
                    //     maskClosable: true,
                    //     'data-seed': 'logId',
                    //     wrapProps,
                    // },
                    //     (buttonIndex) => {
                    //         params.onSelect(BUTTONS[buttonIndex]);
                    //     });
                    params.initSettings();
                }}>初始化</Button>
            </View>
        };
    };

    initSettings() {
        alert('确定要初始化？', '初始化之后会覆盖掉当前温控内部的配置', [
            { text: '取消', onPress: () => console.log('Canceled.'), style: 'default' },
            {
                text: '确定', onPress: () => {
                    console.log('ok')
                    this.setState({
                        coldInTemp: 15,
                        coldOutTemp: 30,
                        hotInTemp: 8,
                        hotOutTemp: 32,
                        coldCtrl: 0,
                        hotCtrl: 1,
                        tempWaterAction: 2,
                    });
                }
            }
        ])
    }

    onSelect(action) {
        const { navigate } = this.props['navigation'];

        if (action === '初始化') {
            this.initSettings();
        } else if (action === '维修完成') {
            if (this._data._id) {
                OrderSvc.setDone(this._data._id).then(res => {
                    Toast.info("保存成功！");
                    navigate('Request');
                });
            }
        }
    }

    componentDidMount() {
        this.props['navigation'].setParams({
            initSettings: this.initSettings.bind(this),
            onSelect: this.onSelect.bind(this)
        });

        this.saveCtrl = this.saveCtrl.bind(this);

        const { state } = this.props['navigation'];

        console.log(this._data = state.params);
        console.log(this.props);

        if (state.params.data.customerPhone) {
            DvcSvc.list(state.params.data.customerPhone).then(res => {
                console.log(res);

                if (res.list.length == 0) return;

                Mqtt.subscribe([
                    `/MAC/${res.list[0].mac}/#`
                ]);
            })
        } else {
            Mqtt.subscribe([
                `/MAC/${state.params.data.mac}/#`
            ]);
        }

    }


    state = {
        coldInTemp: null,
        coldOutTemp: null,
        hotInTemp: null,
        hotOutTemp: null,
        coldCtrl: null,
        hotCtrl: null,
        ctrlCycle: '保留',
        tempWaterAction: null,
        status: {
            powerStatus: POWER.ON,
            mode: '',
            conn: '',
            exception: { values: [] },
            tempIn: '',
            tempOut: '',
            tempEnv: ''
        },
        visible: false
    }

    setExpireTimeCtrl(date) {
        let expireDate = new Date(date || Date.now());

        // ctrl gate
        Mqtt.send(TOPIC_CTRL, composeMQTTPayload({
            action: MQTT_ACTION.DC,
            MAC: MAC,
            ['CTRL_KEY' + CTRL_KEY.PowerSet]: POWER.DISABLE,
            ['CTRL_KEY' + CTRL_KEY.OperationalMode]: MODE.COLD_PLAIN_HEAT,
            ['CTRL_KEY' + CTRL_KEY.SilentMode]: '00',
            ['CTRL_KEY' + CTRL_KEY.FaultReset]: '00',
            ['TIME_KEY' + TIME_KEY.Year]: parseInt(expireDate.getFullYear().toString().slice(-2)).toString(16),
            ['TIME_KEY' + TIME_KEY.Month]: (expireDate.getMonth() + 1).toString(16),
            ['TIME_KEY' + TIME_KEY.Day]: expireDate.getDate().toString(16),
            ['TIME_KEY' + TIME_KEY.Hour]: expireDate.getHours().toString(16),
            ['TIME_KEY' + TIME_KEY.Minute]: expireDate.getMinutes().toString(16)
        }));
    }
    saveCtrl() {
        // config gate
        let payload = composeMQTTPayload({
            action: MQTT_ACTION.CFG,
            MAC: MAC,
            [CFG_KEY.Cooling_WaterCtrl]: this.state.coldCtrl,
            [CFG_KEY.Heating_WaterCtrl]: this.state.hotCtrl,
            [CFG_KEY.SetTemp_Cool_WaterIN]: this.state.coldInTemp,
            [CFG_KEY.SetTemp_Cool_WaterOUT]: this.state.coldOutTemp,
            [CFG_KEY.SetTemp_Heat_WaterIN]: this.state.hotInTemp,
            [CFG_KEY.SetTemp_Heat_WaterOUT]: this.state.hotOutTemp,
            [CFG_KEY.SetTemp_WaterAction]: this.state.tempWaterAction,
            [CFG_KEY.CtrlCycle]: '0000'
        });

        console.log(payload);

        Mqtt.send(TOPIC_CFG, payload);
    }

    getLabel(dataSet, value) {
        value = value || 0;
        return (dataSet || []).filter(item => item.value == value)[0].label;
    }

    render() {
        return (
            <ScrollView>

                <WhiteSpace />
                <View>
                    <Item align='middle'>
                        <Text style={styles.itemTitle}>故障状态码({this.state.status.exception.values.length})</Text>
                    </Item>

                    {this.state.status.exception.values.map(item => {
                        if (item.code) {
                            return <Item style={styles.item} multipleLine extra={
                                <Text>{item.desc}</Text>
                            }>{item.code + ':' + item.value}</Item>
                        }
                        return null;
                    })}
                </View>

                <WhiteSpace />
                <List>
                    <Item align='middle' extra={
                        <Button type="ghost" size="small" onClick={e => {
                            this.saveCtrl();
                        }} inline>保存</Button>
                    }>
                        <Text style={styles.itemTitle}>配置列表</Text>
                    </Item>

                    <Picker
                        extra={this.state.coldInTemp}
                        data={coldInTempRange}
                        onOk={v => {
                            this.setState({
                                coldInTemp: v
                            })
                        }}
                        onDismiss={() => console.log('dismiss')}
                    >
                        <Item arrow="horizontal">制冷回水温度(℃)</Item>
                    </Picker>

                    <Picker extra={this.state.hotInTemp}
                        data={hotInTempRange}
                        onOk={v => {
                            this.setState({
                                hotInTemp: v
                            })
                        }}
                        onDismiss={() => console.log('dismiss')}
                    >
                        <Item arrow="horizontal">制热回水温度(℃)</Item>
                    </Picker>

                    <Picker extra={this.state.coldOutTemp}
                        data={coldOutTempRange}
                        onOk={v => {
                            this.setState({
                                coldOutTemp: v
                            })
                        }}
                        onDismiss={() => console.log('dismiss')}
                    >
                        <Item arrow="horizontal">制冷出水温度(℃)</Item>
                    </Picker>


                    <Picker extra={this.state.hotOutTemp}
                        format={values => {
                            return values.join('');
                        }}
                        data={hotOutTempRange}
                        onOk={v => {
                            this.setState({
                                hotOutTemp: v
                            })
                        }}
                        onDismiss={() => console.log('dismiss')}
                    >
                        <Item arrow="horizontal">制热出水温度(℃)</Item>
                    </Picker>


                    <Picker extra={this.getLabel(ctrlRange, this.state.coldCtrl)}
                        data={ctrlRange}
                        onOk={v => {
                            this.setState({
                                coldCtrl: v
                            })
                        }}
                        onDismiss={() => console.log('dismiss')}
                    >
                        <Item arrow="horizontal">制冷控制选择</Item>
                    </Picker>

                    <Picker extra={this.getLabel(ctrlRange, this.state.hotCtrl)}
                        data={ctrlRange}
                        onOk={v => {
                            this.setState({
                                hotCtrl: v
                            })
                        }}
                        onDismiss={() => console.log('dismiss')}
                    >
                        <Item arrow="horizontal">制热控制选择</Item>
                    </Picker>

                    <Picker extra={this.state.tempWaterAction}
                        data={tempWaterActionRange}
                        onOk={v => {
                            this.setState({
                                tempWaterAction: v
                            })
                        }}
                        onDismiss={() => console.log('dismiss')}
                    >
                        <Item arrow="horizontal">水温动作回差</Item>
                    </Picker>

                    <Item extra={this.state.ctrlCycle}>
                        温控周期
                    </Item>
                </List>
                <WhiteSpace />

                <View>
                    <Item>实时温控状态</Item>
                    <Item><Text>开关: {(this.state.status.powerStatus == POWER.ON ? '开' : '关')}</Text></Item>
                    <Item><Text>HMI通信状态: {this.state.status.conn == '00' ? '断' : '通'}</Text></Item>
                    <Item><Text>入水温度: {this.state.status.tempIn}℃ </Text></Item>
                    <Item><Text>出水温度: {this.state.status.tempOut}℃ </Text></Item>
                    <Item><Text>环境温度: {this.state.status.tempEnv}℃ </Text></Item>
                </View>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        alignItems: 'center'
    },
    itemTitle: {
        fontSize: 18,
        color: '#111'
    },
    pitem: {
        fontSize: 20,
        height: 30
    }
})