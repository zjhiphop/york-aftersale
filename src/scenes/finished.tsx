import * as React from 'react';
import { View, Text } from 'react-native';
import { Card, WingBlank, WhiteSpace, Badge } from 'antd-mobile';
import call from 'react-native-phone-call'
import OrderSvc from '../utils/order-svc';

export default class RequestScreen extends React.Component {

    constructor(props) {
        super(props);

        OrderSvc.list(2).then(res => {
            console.log(res);
            this.setState({
                'list': res.list || []
            });
        })
    }

    state = {
        list: []
    }
    static navigationOptions = {
        title: '已完成单'
    };
    render() {
        return (
            <View>
                <WingBlank size="lg">
                    <WhiteSpace size="lg" />
                    {this.state.list.map(this._renderCard.bind(this))}
                </WingBlank>
            </View>
        );
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
            <Card.Footer content={<Text>{data.createAt}</Text>} extra={
                <Badge text="已完成"
                    style={{ position: 'absolute', right: 15 }}></Badge>} />
            } />
        </Card>
    }
};