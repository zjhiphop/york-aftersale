import * as React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import {
    Card, WingBlank, WhiteSpace,
    Toast, Button, ActionSheet,
    Badge, SegmentedControl
} from 'antd-mobile';

import call from 'react-native-phone-call';
import OrderSvc from '../utils/order-svc';
import { MAPS_TYPE, MapSvc } from '../utils/map-svc';
import moment from 'moment';

const ACTIONS = [
    { filterName: '新装单', filterField: 'type', filterValue: 0, operation: 'eq' },
    { filterName: '维修单', filterField: 'type', filterValue: 1, operation: 'eq' },
    { filterName: '过期单', filterField: 'expireDate', filterValue: new Date(), operation: 'lt-date' },
]

export default class RequestScreen extends React.Component {
    constructor(props) {
        super(props);

        OrderSvc.list().then(res => {
            console.log(res);
            this._allList = res.list;

            this.setState({
                'list': res.list || []
            });
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

        this.onChange = this.onChange.bind(this);
    }
    static navigationOptions = {
        title: '待处理单'
    };

    _allList = []

    state = {
        currLocation: {},
        mapTypes: [],
        list: [
            {
                "title": "空调初始化2",
                "detail": "将温控初始化，检查制冷制热效果1",
                "type": 0,
                "customerName": "顾客",
                "customerPhone": "123123123",
                "customerAddress": "无锡市南长区南湖大道789号",
                "backendNote": "123123",
                "frontendNote": null,
                "status": 4,
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
        ]
    }

    isExpired(dateString) {
        return moment().toDate() > new Date(dateString);
    }

    _scrolling = false

    onChange(e) {
        let index = e.nativeEvent.selectedSegmentIndex;
        let operation = ACTIONS[index].operation;
        let filterName = ACTIONS[index].filterName;
        let filterValue = ACTIONS[index].filterValue;

        let list = [];
        switch (operation) {
            case 'eq':
                list = this._allList.filter(item => item[filterName] = filterValue)
                break;
            case 'ne':
                list = this._allList.filter(item => item[filterName] != filterValue)
                break;
            case 'gt':
                list = this._allList.filter(item => item[filterName] > filterValue)
                break;
            case 'lt-date':
                list = this._allList.filter(item => new Date(item[filterName]) < filterValue)
                break;
            case 'lt':
                list = this._allList.filter(item => item[filterName] < filterValue)
                break;
        }

        this.setState({ list: list });
    }
    render() {
        console.log(this.state);

        return (
            <View>
                <SegmentedControl
                    values={ACTIONS.map(action => action.filterName)}
                    onChange={this.onChange}
                />
                <ScrollView onScrollBeginDrag={e => {
                    this._scrolling = true;
                }} onScrollEndDrag={e => {
                    this._scrolling = false;
                }}>
                    <WingBlank size="lg">
                        <WhiteSpace size="lg" />
                        {this.state.list.map(this._renderCard.bind(this))}
                    </WingBlank>
                </ScrollView>
            </View>
        );
    }

    setDone(id) {
        OrderSvc.setDone(id).then(res => {
            console.log(res);

            this.setState({
                list: this.state.list.filter(item => item._id !== id)
            })

            Toast.show('设置成功！');
        });
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
    _renderBadge(date) {
        return this.isExpired(date) ? <Badge text="已过期" style={styles.badge}></Badge> : <Text></Text>;
    }
    _renderCard(data) {

        const { navigate } = this.props['navigation'];
        return <View
            onTouchEnd={e => {
                if (this._scrolling) return;
                navigate('OrderDetail', { data: data });
            }}>
            <Card>
                <Card.Header
                    title={data.title}
                    extra={
                        <View
                            onTouchEnd={e => {
                                if (this._scrolling) return;
                                e.stopPropagation();
                                const args = {
                                    number: data.customerPhone, // String value with the number to call
                                    prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
                                }

                                call(args).catch(console.error)
                            }}>
                            <Text style={styles.title}
                            >{data.customerName + '(' + data.customerPhone + ')'}</Text>
                        </View>}
                />
                <Card.Body>
                    <View style={styles.body}>
                        <Text style={styles.detail}> {data.detail} </Text>
                        {this._renderBadge(data.expireDate)}
                        <View onTouchEnd={e => {
                            if (this._scrolling) return;
                            e.stopPropagation();
                            this.showMapAction(data.customerAddress);
                        }}><Text style={styles.address}> 住址：{data.customerAddress}</Text></View>
                    </View>
                </Card.Body>
                <Card.Footer content={
                    <View>
                        <Text style={styles.footerTitle}>预约时间</Text>
                        <Text>{moment(data.expectDate).format('YYYY/MM/DD h:mm')}</Text>
                        <Text style={styles.footerTitle}>截止时间</Text>
                        <Text>{moment(data.expireDate).format('YYYY/MM/DD h:mm')}</Text>
                    </View>
                } extra={
                    <View onTouchEnd={e => {
                        if (this._scrolling) return;
                        e.stopPropagation();
                        this.setDone(data._id);
                    }}><Button style={styles.footerBtn}>维修完毕</Button></View>} />
            </Card>
            <WhiteSpace size="lg" />
        </View>
    }
};

const styles = StyleSheet.create({
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
    title: {
        position: 'absolute',
        right: 5,
        top: -5,
        color: 'grey'
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
})