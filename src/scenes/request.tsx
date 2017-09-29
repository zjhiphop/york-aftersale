import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, WingBlank, WhiteSpace, Toast, Button } from 'antd-mobile';
import call from 'react-native-phone-call';
import OrderSvc from '../utils/order-svc';

export default class RequestScreen extends React.Component {
    constructor(props) {
        super(props);

        // OrderSvc.list().then(res => {
        //     console.log(res);
        //     this.setState({
        //         'list': res.list || []
        //     });
        // })
    }
    static navigationOptions = {
        title: '待维修单'
    };

    state = {
        list: [
            {
                title: '王晓二',
                customerPhone: '13666666666',
                detail: '水泵故障',
                customerAddress: '无锡市南长区XXX',
                createAt: '2017-09-22 15:20:30',
                _id: 1
            },
            {
                title: '杨思',
                customerPhone: '13666666666',
                detail: '水泵故障',
                customerAddress: '无锡市南长区XXX',
                createAt: '2017-09-22 15:20:30',
                _id: 2
            },
            {
                title: '马三',
                customerPhone: '13666666666',
                detail: '水泵故障',
                customerAddress: '无锡市南长区XXX',
                createAt: '2017-09-22 15:20:30',
                _id: 3
            }
        ]
    }

    render() {
        console.log(this.state);

        return (
            <View>
                <WingBlank size="lg">
                    <WhiteSpace size="lg" />
                    {this.state.list.map(this._renderCard.bind(this))}
                </WingBlank>
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

    _renderCard(data) {
        return <View>
            <Card>
                <Card.Header
                    title={data.title}
                    extra={<Text style={styles.title} onPress={e => {

                        const args = {
                            number: data.customerPhone, // String value with the number to call
                            prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
                        }

                        call(args).catch(console.error)

                    }} >{data.customerPhone}</Text>}
                />
                <Card.Body>
                    <View style={styles.body}>
                        <Text> {data.detail} </Text>
                        <Text> 住址：{data.customerAddress}</Text>
                    </View>
                </Card.Body>
                <Card.Footer content={<Text style={styles.footerTitle}>{data.createAt}</Text>} extra={<Text style={styles.button} onPress={e => {
                    this.setDone(data._id);
                }}>立即处理</Text>} />
            </Card>
            <WhiteSpace size="lg" />
        </View>
    }
};



const styles = StyleSheet.create({
    title: {
        position: 'absolute',
        right: 5,
        top: -5,
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
    },
    button: {
        position: 'absolute',
        top: -30,
        right: 10,
        fontSize: 18,
        color: 'blue'
    }
})