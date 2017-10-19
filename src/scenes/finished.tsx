import * as React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { List, Card, WingBlank, WhiteSpace, Toast, Button, Badge } from 'antd-mobile';
import call from 'react-native-phone-call';
import OrderSvc from '../utils/order-svc';
import { ORDER_STATUS } from '../utils/misc';

let Item = List.Item;

export default class FinishedScreen extends React.Component {

    constructor(props) {
        super(props);

        OrderSvc.list(ORDER_STATUS.CONFIRMED).then(res => {
            console.log(res);

            if (res.list.length === 0) {
                Toast.info('暂无完成订单');
            }
            this.setState({
                'list': res.list || []
            });
        })
    }

    state = {
        list: [{
            title: '马三',
            customerPhone: '13666666666',
            detail: '水泵故障',
            customerAddress: '无锡市南长区XXX',
            createAt: '2017-09-22 15:20:30',
            _id: 1
        }]
    }
    static navigationOptions = {
        title: '已完成单'
    };
    render() {
        return (
            <ScrollView>
                <WingBlank size="lg">
                    <WhiteSpace size="lg" />
                    {this.state.list.map(this._renderCard.bind(this))}
                </WingBlank>
            </ScrollView>
        );
    }

    _renderCard(data) {
        return <View key={data._id}>
            <List>
                <Item extra={<Text style={styles.title} onPress={e => {

                    const args = {
                        number: data.customerPhone, // String value with the number to call
                        prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
                    }

                    call(args).catch(console.error)

                }} >{data.customerPhone}</Text>} >{data.title}</Item>

                <Item style={styles.body}>
                    <Text> {data.detail} </Text>
                    <Text> 住址：{data.customerAddress}</Text>
                </Item>

                <Item extra={
                    <Badge text="已完成"
                        style={{ position: 'absolute', right: 30 }}></Badge>
                }>
                    <Text style={styles.footerTitle}>{data.createAt}</Text>
                </Item>
            </List>
            <WhiteSpace size="lg" />
        </View >;
    }
};


const styles = StyleSheet.create({
    title: {
        color: 'grey'
    },
    body: {
        padding: 10
    },
    footerTitle: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        color: 'grey'
    }
})