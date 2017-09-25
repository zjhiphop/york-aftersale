import * as React from 'react';
import { View, Text } from 'react-native';
import { Card, WingBlank, WhiteSpace, Toast } from 'antd-mobile';
import call from 'react-native-phone-call';
import OrderSvc from '../utils/order-svc';

export default class RequestScreen extends React.Component {
    constructor(props) {
        super(props);

        OrderSvc.list().then(res => {
            console.log(res);
            this.setState({
                'list': res.list || []
            });
        })
    }
    static navigationOptions = {
        title: '待维修单'
    };

    state = {
        list: []
    }

    render() {
        console.log(this.state);

        return (
            <View>
                <WingBlank size="lg">
                    <WhiteSpace size="lg" />
                    {this.state.list.map(this._renderCard.bind(this))}
                    <WhiteSpace size="lg" />
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
        return <Card>
            <Card.Header
                title={data.title}
                thumb="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png"
                extra={<Text onPress={e => {

                    const args = {
                        number: data.customerPhone, // String value with the number to call
                        prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
                    }

                    call(args).catch(console.error)

                }} >{data.customerPhone}</Text>}
            />
            <Card.Body>
                <Text> {data.detail} </Text>
                <Text> 住址：{data.customerAddress}</Text>
            </Card.Body>
            <Card.Footer content={<Text>{data.createAt}</Text>} extra={<Text onPress={e => {
                this.setDone(data._id);
            }}>立即处理</Text>} />
        </Card>
    }
};