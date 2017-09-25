import * as React from 'react';
import { View, Text } from 'react-native';
import { Card, Picker, WingBlank, WhiteSpace, List, Modal, PickerView, Button } from 'antd-mobile';
import { seq } from '../utils/misc';
import Mqtt from '../utils/mqtt';
import { EventRegister } from 'react-native-event-listeners'
import { composeMQTTPayload, CTRL_KEY, CFG_KEY, TIME_KEY } from '../utils/misc';

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
const TOPIC_DATA = `/MAC/${MAC}/DR`;
const TOPIC_CTRL = `/MAC/${MAC}/DC`;
const TOPIC_CFG = `/MAC/${MAC}/DFG`;
const TOPIC_DR = `/MAC/${MAC}/DR`;

export default class SettingDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        let client = Mqtt.subscribe([
            `/MAC/${MAC}/#`
        ]);

        this.initEvents();
        this.query();
    }

    query() {
        Mqtt.send(TOPIC_DR, composeMQTTPayload({
            action: 'DR',
            MAC: MAC
        }));
    }

    initEvents() {
        EventRegister.on(TOPIC_DATA, payload => {
            console.log('new data read: ', payload);
        });

        EventRegister.on(TOPIC_CTRL, payload => {
            console.log('new ctrl read: ', payload);
        });

        EventRegister.on(TOPIC_CFG, payload => {
            console.log('new cfg read: ', payload);
        });
    }
    static navigationOptions = {
        title: '温控设置详情'
    };
    state = {
        coldInTemp: null,
        coldOutTemp: null,
        hotInTemp: null,
        hotOutTemp: null,
        coldCtrl: null,
        hotCtrl: null,
        ctrlCycle: '保留',
        tempWaterAction: null
    }
    onChange() {

    }
    render() {
        return (
            <View>
                <WhiteSpace />
                <List>
                    <Picker extra={this.state.coldInTemp}
                        data={coldInTempRange}
                        onOk={v => {
                            this.setState({
                                coldInTemp: v
                            })
                        }}
                        onDismiss={() => console.log('dismiss')}
                    >
                        <Item arrow="horizontal">制冷回水温度设定值 {this.state.coldInTemp}</Item>
                    </Picker>

                    <Picker extra={this.state.hotInTemp}
                        data={coldInTempRange}
                        onOk={v => {
                            this.setState({
                                hotInTemp: v
                            })
                        }}
                        onDismiss={() => console.log('dismiss')}
                    >
                        <Item arrow="horizontal">制热回水温度设定 {this.state.hotInTemp}</Item>
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
                        <Item arrow="horizontal">制冷出水温度设定 {this.state.coldOutTemp}</Item>
                    </Picker>


                    <Picker extra={this.state.hotOutTemp}
                        data={hotOutTempRange}
                        onOk={v => {
                            this.setState({
                                hotOutTemp: v
                            })
                        }}
                        onDismiss={() => console.log('dismiss')}
                    >
                        <Item arrow="horizontal">制热出水温度设定 {this.state.hotOutTemp}</Item>
                    </Picker>



                    <Picker extra={this.state.coldCtrl}
                        data={ctrlRange}
                        onOk={v => {
                            this.setState({
                                coldCtrl: v
                            })
                        }}
                        onDismiss={() => console.log('dismiss')}
                    >
                        <Item arrow="horizontal">制冷控制选择设定{this.state.coldCtrl}</Item>
                    </Picker>

                    <Picker extra={this.state.hotCtrl}
                        data={ctrlRange}
                        onOk={v => {
                            this.setState({
                                hotCtrl: v
                            })
                        }}
                        onDismiss={() => console.log('dismiss')}
                    >
                        <Item arrow="horizontal">制热控制选择设定  {this.state.hotCtrl}</Item>
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
                        <Item arrow="horizontal">水温动作回差设定 {this.state.tempWaterAction}</Item>
                    </Picker>

                    <Item extra={this.state.ctrlCycle}>
                        温控周期
                    </Item>

                </List>

                <WhiteSpace />

                <Item multipleLine extra={
                    <View>
                        <Text>A01</Text>
                        <Text>A02</Text>
                        <Text>A03</Text>
                        <Button type="primary" style={{ position: "absolute", right: 0 }}>清除</Button>
                    </View>
                }>故障状态码</Item>
            </View>
        );
    }
}