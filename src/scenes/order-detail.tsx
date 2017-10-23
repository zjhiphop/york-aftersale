import * as React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {
    Card, WingBlank, WhiteSpace,
    Toast, Button, ActionSheet,
    Badge, InputItem, TextareaItem,
    Steps
} from 'antd-mobile';

import call from 'react-native-phone-call';
import OrderSvc from '../utils/order-svc';
import { MAPS_TYPE, MapSvc } from '../utils/map-svc';
import moment from 'moment';
import Timeline from 'react-native-timeline-listview';

export default class OrderDetailScreen extends React.Component {
    constructor(prop) {
        super(prop);
    }

    componentDidMount() {
        const { state } = this.props['navigation'];

        console.log(state.params);

        this.setState({
            data: state.params.data
        })

        MapSvc.getMapTypes().then(res => {
            this.setState({
                mapTypes: res
            })
        });

        MapSvc.getLocation().then(res => {
            this.setState({
                currLocation: res
            })
        })
    }

    state = {
        mapTypes: [],
        currLocation: {},
        data: {
            "title": "空调初始化2",
            "detail": "将温控初始化，检查制冷制热效果1",
            "type": 0,
            "customerName": "顾客",
            "customerPhone": "123123123",
            "customerAddress": "无锡市南长区南湖大道789号",
            "backendNote": "123123",
            "frontendNote": null,
            "status": 1,
            "expectDate": "2017-09-22T01:48:59.045Z",
            "expireDate": "2017-10-16T07:42:08.215Z",
            "createAt": "2017-09-22T01:48:59.050Z",
            "_id": "59c46c0b43d1356d42f3a5fa",
            "operatorId": "59c3b7dc24a1afdd5913bc9f",
            "orderHistory": [
                {
                    "operation": "订单状态修改为【已确认】",
                    "createAt": "2017-10-16T08:42:59.676Z",
                    "_id": "59e471131b96546252e6df1e",
                    "orderId": "59c46c0b43d1356d42f3a5fa"
                }
            ]
        }
    }

    static navigationOptions = {
        title: '维修单详情'
    };

    isExpired(dateString) {
        return moment().toDate() > new Date(dateString);
    }

    _renderBadge(date) {
        return this.isExpired(date) ? <Badge text="已过期" style={styles.badge}></Badge> : <Text></Text>;
    }

    showMapAction(message) {
        let BUTTONS = this.state.mapTypes.map(item => item.name).concat(['取消']);

        ActionSheet.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: BUTTONS.length - 1,
            title: '请选择地图打开',
            message: message,
            maskClosable: true
        },
            (buttonIndex) => {
                if (this.state.mapTypes[buttonIndex]) {
                    MapSvc.openNav(this.state.mapTypes[buttonIndex], message);
                }
            });
    }

    render() {
        const { navigate } = this.props['navigation'];
        return <View style={{ flex: 1 }}>

            <ScrollView>
                <WhiteSpace size="lg" />
                <Text style={styles.title}>基本信息</Text>
                <WingBlank size="lg">
                    <WhiteSpace size="lg" />
                    <Card>
                        <Card.Header
                            title={this.state.data.title}></Card.Header>
                        <Card.Body>
                            <View style={styles.body}>
                                <Text style={styles.detail}> {this.state.data.detail} </Text>
                                {this._renderBadge(this.state.data.expireDate)}
                                <View onTouchEnd={e => {
                                    e.stopPropagation();
                                    this.showMapAction(this.state.data.customerAddress);
                                }}><Text style={styles.address}> 住址：{this.state.data.customerAddress}</Text></View>
                            </View>
                        </Card.Body>
                        <Card.Footer></Card.Footer>
                    </Card>
                    <WhiteSpace size="lg" />
                </WingBlank>
                <Text style={styles.title}>操作记录</Text>
                <WingBlank size="lg">
                    <WhiteSpace size="lg" />
                    <Timeline
                        timeStyle={{ textAlign: 'center', backgroundColor: '#00e', color: 'white', padding: 5, borderRadius: 20 }}

                        data={this.state.data.orderHistory.map(item => {
                            return {
                                time: moment(item.createAt).format('YYYY-MM-DD'),
                                title: item.operation,
                                description: item.operation
                            }
                        })}
                    />
                    <WhiteSpace size="lg" />
                </WingBlank>

                <Text style={styles.title}>配置</Text>
                <WhiteSpace size="lg" />
                <TextareaItem
                    placeholder="用户手机号"
                    defaultValue={this.state.data.customerPhone}
                    onChange={value => {

                    }}
                ></TextareaItem>
                <TextareaItem
                    placeholder="备注"
                    onChange={value => {

                    }}
                ></TextareaItem>
                <WhiteSpace size="lg" />
            </ScrollView>
            <View style={{ height: 50, bottom: 10 }}>
                <Button type="primary" onClick={e => {
                    navigate('Settings', { data: [this.state.data] });
                }}>新装配置</Button><WhiteSpace />
            </View>
            <View style={{ height: 50, bottom: 0 }}>
                <Button type="primary" onClick={e => {
                    navigate('SettingDetail', { data: this.state.data });
                }}>维修配置</Button><WhiteSpace />
            </View>
        </View >
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 15,
        marginLeft: 20,
        fontWeight: 'bold'
    },
    footerTitle: {
        color: 'grey',
        marginBottom: 10,
        marginTop: 10
    },
    footerBtn: {
        position: 'absolute',
        bottom: -90,
        right: 10
    },
    body: {
        padding: 10
    },
    badge: {
        position: 'absolute',
        right: 25,
        top: 10,
        borderRadius: 2
    },
    button: {
        position: 'absolute',
        bottom: 0,
        right: 10,
        fontSize: 18,
        color: 'blue'
    },
    detail: {
        color: '#333'
    },
    address: {
        color: '#999',
        marginTop: 10,
        marginBottom: 10
    }
});