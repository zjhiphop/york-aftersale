import * as React from 'react';
import { View, Text } from 'react-native';
import { Card, WingBlank, WhiteSpace, Toast } from 'antd-mobile';
import call from 'react-native-phone-call';
import OrderSvc from '../utils/order-svc';
export default class RequestScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
        OrderSvc.list().then(res => {
            console.log(res);
            this.setState({
                'list': res.list || []
            });
        });
    }
    render() {
        console.log(this.state);
        return (React.createElement(View, null,
            React.createElement(WingBlank, { size: "lg" },
                React.createElement(WhiteSpace, { size: "lg" }),
                this.state.list.map(this._renderCard.bind(this)),
                React.createElement(WhiteSpace, { size: "lg" }))));
    }
    setDone(id) {
        OrderSvc.setDone(id).then(res => {
            console.log(res);
            this.setState({
                list: this.state.list.filter(item => item._id !== id)
            });
            Toast.show('设置成功！');
        });
    }
    _renderCard(data) {
        return React.createElement(Card, null,
            React.createElement(Card.Header, { title: data.title, thumb: "https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png", extra: React.createElement(Text, { onPress: e => {
                        const args = {
                            number: data.customerPhone,
                            prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
                        };
                        call(args).catch(console.error);
                    } }, data.customerPhone) }),
            React.createElement(Card.Body, null,
                React.createElement(Text, null,
                    " ",
                    data.detail,
                    " "),
                React.createElement(Text, null,
                    " \u4F4F\u5740\uFF1A",
                    data.customerAddress)),
            React.createElement(Card.Footer, { content: React.createElement(Text, null, data.createAt), extra: React.createElement(Text, { onPress: e => {
                        this.setDone(data._id);
                    } }, "\u7ACB\u5373\u5904\u7406") }));
    }
}
RequestScreen.navigationOptions = {
    title: '待维修单'
};
;
//# sourceMappingURL=request.js.map