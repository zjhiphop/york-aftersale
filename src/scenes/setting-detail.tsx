import * as React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
    Card,
    Picker,
    WingBlank,
    WhiteSpace,
    List,
    Modal,
    PickerView,
    Button
} from 'antd-mobile';
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
    POWER
} from '../utils/misc';
import { NavBarButtonPress } from 'react-navigation';
import TextStyles from '../style/text';

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

export default class SettingDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        let client = Mqtt.subscribe([
            `/MAC/${MAC}/#`
        ]);

        this.onChange = this.onChange.bind(this);

        console.log(this.props);
    }

    componentWillMount() {

        this.initEvents();
        this.query();

    }

    query() {
        Mqtt.send(TOPIC_DR, composeMQTTPayload({
            action: MQTT_ACTION.DR,
            MAC: MAC
        }));
    }

    initEvents() {
        EventRegister.on(TOPIC_DATA, payload => {
            console.log('new data read: ', payloadParser(payload));
            this.setState({ 'status': payloadParser(payload) });
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
            headerRight: <Text style={TextStyles.title} onPress={() => params.initSettings()}>初始化</Text>
        };
    };

    initSettings() {
        alert('确定要初始化？', '初始化之后会覆盖掉当前温控内部的配置', [
            { text: '取消', onPress: () => console.log('Canceled.'), style: 'default' },
            { text: '确定', onPress: () => console.log('ok') }
        ])
    }

    componentDidMount() {
        this.props['navigation'].setParams({ initSettings: this.initSettings });
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
        config: {

        }
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

    render() {
        return (
            <ScrollView>
                <WhiteSpace />
                <List>
                    <Picker extra={this.state.coldInTemp}
                        data={coldInTempRange}
                        onOk={v => {
                            this.setState({
                                coldInTemp: v
                            }, this.onChange)
                        }}
                        onDismiss={() => console.log('dismiss')}
                    >
                        <Item arrow="horizontal">制冷回水温度设定值</Item>
                    </Picker>

                    <Picker extra={this.state.hotInTemp}
                        data={coldInTempRange}
                        onOk={v => {
                            this.setState({
                                hotInTemp: v
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
                                coldOutTemp: v
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
                                hotOutTemp: v
                            }, this.onChange)
                        }}
                        onDismiss={() => console.log('dismiss')}
                    >
                        <Item arrow="horizontal">制热出水温度设定</Item>
                    </Picker>


                    <Picker extra={this.state.coldCtrl}
                        data={ctrlRange}
                        onOk={v => {
                            this.setState({
                                coldCtrl: v
                            }, this.onChange)
                        }}
                        onDismiss={() => console.log('dismiss')}
                    >
                        <Item arrow="horizontal">制冷控制选择设定</Item>
                    </Picker>

                    <Picker extra={this.state.hotCtrl}
                        data={ctrlRange}
                        onOk={v => {
                            this.setState({
                                hotCtrl: v
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
                                tempWaterAction: v
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

                <WhiteSpace />

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
                            return <Item multipleLine extra={
                                <Text>{[item.code, item.value, item.desc].join(' ')}</Text>
                            }></Item>
                        }
                        return null;
                    })}
                </View>


            </ScrollView>
        );
    }
}