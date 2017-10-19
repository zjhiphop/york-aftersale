import * as React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
    Card,
    Picker,
    WingBlank,
    WhiteSpace,
    List,
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
    POWER, ACTION_TYPE
} from '../utils/misc';
import { NavBarButtonPress } from 'react-navigation';
import TextStyles from '../style/text';
import OrderSvc from '../utils/order-svc';

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
const customIcon = src => <img src={src} className="am-icon am-icon-xs" alt="icon" />;

export default class SettingDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        let client = Mqtt.subscribe([
            `/MAC/${MAC}/#`
        ]);

        this.onChange = this.onChange.bind(this);

        const { state } = this.props['navigation'];

        console.log(this._data = state.params);
        console.log(this.props);
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
    }

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;

        return {
            title: "配置详情",
            headerRight: <View>
                <Popover
                    overlayStyle={{
                        top: 30
                    }}
                    overlay={[
                        (<PItem
                            key="5"
                            value="init">
                            <Text style={styles.pitem}>初始化</Text>
                        </PItem>),
                        (<PItem key="4" value="save">
                            <Text style={styles.pitem}>维修完成</Text>
                        </PItem>)
                    ]}
                    onSelect={(e) => params.onSelect(e)}
                >
                    <View style={{
                        height: '100%',
                        padding: 15,
                        marginRight: 15,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                    >
                        <Icon type="ellipsis" />
                    </View>

                </Popover>
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

        if (action === 'init') {
            this.initSettings();
        } else if (action === 'save') {
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
    onChange() {
        // ctrl gate
        // Mqtt.send(TOPIC_CTRL, composeMQTTPayload({
        //     action: MQTT_ACTION.DC,
        //     MAC: MAC,
        //     [CTRL_KEY.PowerSet]: '',
        //     [CTRL_KEY.OperationalMode]: '',
        //     [CTRL_KEY.SilentMode]: '',
        //     [CTRL_KEY.FaultReset]: '',
        //     [TIME_KEY.Month]: '',
        //     [TIME_KEY.Day]: '',
        //     [TIME_KEY.Hour]: '',
        //     [TIME_KEY.Minute]: ''
        // }));

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

                <View>
                    <Item extra={
                        <View>
                            <Text style={{
                                position: "absolute",
                                right: 0
                            }}>清除({this.state.status.exception.values.length})</Text></View>
                    }>
                        故障状态码
                        </Item>

                    {this.state.status.exception.values.map(item => {
                        if (item.code) {
                            return <Item style={styles.item} multipleLine extra={
                                <Text>{[item.code, item.value, item.desc].join(' ')}</Text>
                            }></Item>
                        }
                        return null;
                    })}
                </View>

                <WhiteSpace />
                <List>
                    <Picker extra={this.state.coldInTemp}
                        data={coldInTempRange}
                        onOk={v => {
                            this.setState({
                                coldInTemp: v[0]
                            }, this.onChange)
                        }}
                        onDismiss={() => console.log('dismiss')}
                    >
                        <Item arrow="horizontal">制冷回水温度设定值</Item>
                    </Picker>

                    <Picker extra={this.state.hotInTemp}
                        data={hotInTempRange}
                        onOk={v => {
                            this.setState({
                                hotInTemp: v[0]
                            }, this.onChange)
                        }}
                        onDismiss={() => console.log('dismiss')}
                    >
                        <Item arrow="horizontal">制热回水温度设定</Item>
                    </Picker>

                    <Picker extra={this.state.coldOutTemp}
                        data={coldOutTempRange}
                        onOk={v => {
                            this.setState({
                                coldOutTemp: v[0]
                            }, this.onChange)
                        }}
                        onDismiss={() => console.log('dismiss')}
                    >
                        <Item arrow="horizontal">制冷出水温度设定</Item>
                    </Picker>


                    <Picker extra={this.state.hotOutTemp}
                        data={hotOutTempRange}
                        onOk={v => {
                            this.setState({
                                hotOutTemp: v[0]
                            }, this.onChange)
                        }}
                        onDismiss={() => console.log('dismiss')}
                    >
                        <Item arrow="horizontal">制热出水温度设定</Item>
                    </Picker>


                    <Picker extra={this.getLabel(ctrlRange, this.state.coldCtrl)}
                        data={ctrlRange}
                        onOk={v => {
                            this.setState({
                                coldCtrl: v[0]
                            }, this.onChange)
                        }}
                        onDismiss={() => console.log('dismiss')}
                    >
                        <Item arrow="horizontal">制冷控制选择设定</Item>
                    </Picker>

                    <Picker extra={this.getLabel(ctrlRange, this.state.hotCtrl)}
                        data={ctrlRange}
                        onOk={v => {
                            this.setState({
                                hotCtrl: v[0]
                            }, this.onChange)
                        }}
                        onDismiss={() => console.log('dismiss')}
                    >
                        <Item arrow="horizontal">制热控制选择设定</Item>
                    </Picker>

                    <Picker extra={this.state.tempWaterAction}
                        data={tempWaterActionRange}
                        onOk={v => {
                            this.setState({
                                tempWaterAction: v[0]
                            }, this.onChange)
                        }}
                        onDismiss={() => console.log('dismiss')}
                    >
                        <Item arrow="horizontal">水温动作回差设定</Item>
                    </Picker>

                    <Item extra={this.state.ctrlCycle}>
                        温控周期
                    </Item>
                </List>
                <WhiteSpace />

                <View>
                    <Item>实时温控状态</Item>
                    <Item><Text>开关: {this.state.status.powerStatus}</Text></Item>
                    <Item><Text>HMI通信状态: {this.state.status.conn}</Text></Item>
                    <Item><Text>入水温度: {this.state.status.tempIn}</Text></Item>
                    <Item><Text>出水温度: {this.state.status.tempOut}</Text></Item>
                    <Item><Text>环境温度: {this.state.status.tempEnv}</Text></Item>
                </View>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        alignItems: 'center'
    },
    pitem: {
        fontSize: 20,
        height: 30
    }
})