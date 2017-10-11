import * as React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {
    Card, WingBlank, WhiteSpace,
    Toast, Button, ActionSheet,
    Badge
} from 'antd-mobile';

import call from 'react-native-phone-call';
import OrderSvc from '../utils/order-svc';
import { MAPS_TYPE, MapSvc } from '../utils/map-svc';
import moment from 'moment';
import Timeline from 'react-native-timeline-listview';

export default class OrderDetailScreen extends React.Component {
    constructor(prop) {
        super(prop);
        const { state } = this.props['navigation'];

        console.log(state.params);

        this.setState({
            data: state.params.data
        })
    }

    componentDidMount() {

    }

    state = {
        data: {
            title: '王晓二',
            customerPhone: '13666666666',
            detail: '水泵故障',
            customerAddress: '无锡市南长区XXX',
            createAt: '2017-09-22 15:20:30',
            endDate: '2017-10-10 12:20:30',
            _id: 1,
            orderHistory: [{
                title: '配置',
                operation: '[管理员] 创建订单',
                createAt: '2017-10-11 12:20:30'
            }, {
                title: '备注',
                operation: '[我] 配置了XX参数',
                createAt: '2017-10-10 13:10:30'
            }]
        }
    }

    static navigationOptions = {
        title: '维修单详情'
    };

    render() {
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
                                time: item.createAt.split(' ')[1],
                                title: item.title,
                                description: item.operation
                            }
                        })}
                    />
                    <WhiteSpace size="lg" />
                </WingBlank>
            </ScrollView>
            <View style={{ height: 50, bottom: 0 }}>
                <Button type="primary">去配置</Button><WhiteSpace />
            </View>
        </View >
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 15,
        marginLeft: 20,
        fontWeight: 'bold'
    }
});