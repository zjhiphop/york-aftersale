import * as React from 'react';
import { View, Text } from 'react-native';
import { Card, WingBlank, WhiteSpace, Badge } from 'antd-mobile';
import call from 'react-native-phone-call';
export default class RequestScreen extends React.Component {
    render() {
        return (React.createElement(View, null,
            React.createElement(WingBlank, { size: "lg" },
                React.createElement(WhiteSpace, { size: "lg" }),
                React.createElement(Card, null,
                    React.createElement(Card.Header, { title: "付竫", thumb: "https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png", extra: React.createElement(Text, { onPress: e => {
                                const args = {
                                    number: '1388888888888',
                                    prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
                                };
                                call(args).catch(console.error);
                            } }, "1388888888888") }),
                    React.createElement(Card.Body, null,
                        React.createElement(Text, null, " \u7A7A\u8C03\u6545\u969C\uFF1A1F00 "),
                        React.createElement(Text, null, " \u4F4F\u5740\uFF1A\u65E0\u9521\u5E02\u4E07\u8C61\u57CEXX\u697C1\u53F7 ")),
                    React.createElement(Card.Footer, { content: "2017-09-23 13:23:32", extra: React.createElement(Badge, { text: "已完成", style: { position: 'absolute', right: 15 } }) })),
                React.createElement(WhiteSpace, { size: "lg" }),
                React.createElement(Card, null,
                    React.createElement(Card.Header, { title: "姜刚", thumb: "https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png", extra: React.createElement(Text, { onPress: e => {
                                const args = {
                                    number: '1388888888888',
                                    prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
                                };
                                call(args).catch(console.error);
                            } }, "1388888888888") }),
                    React.createElement(Card.Body, null,
                        React.createElement(Text, null, " \u7A7A\u8C03\u6545\u969C\uFF1A1F00 "),
                        React.createElement(Text, null, " \u4F4F\u5740\uFF1A\u65E0\u9521\u5E02\u4E07\u8C61\u57CEXX\u697C1\u53F7 ")),
                    React.createElement(Card.Footer, { content: "2017-09-23 13:23:32", extra: React.createElement(Badge, { text: "已完成", style: { position: 'absolute', right: 15 } }) })))));
    }
}
RequestScreen.navigationOptions = {
    title: '已完成单'
};
;
//# sourceMappingURL=finished.js.map