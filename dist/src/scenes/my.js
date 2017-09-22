import * as React from 'react';
import { View } from 'react-native';
import { List, Button, WhiteSpace } from 'antd-mobile';
export default class MyScreen extends React.Component {
    render() {
        const { navigate } = this.props['navigation'];
        return (React.createElement(View, null,
            React.createElement(List, null,
                React.createElement(List.Item, { extra: "Jade" }, "\u7528\u6237\u540D"),
                React.createElement(List.Item, { arrow: "horizontal", onClick: e => {
                        navigate('ResetPass');
                    } }, "\u5BC6\u7801\u4FEE\u6539"),
                React.createElement(List.Item, { arrow: "horizontal" }, "\u5173\u4E8E")),
            React.createElement(WhiteSpace, { size: "xl" }),
            React.createElement(Button, { type: "primary" }, "\u9000\u51FA\u767B\u5F55")));
    }
}
MyScreen.navigationOptions = {
    title: '个人设置',
};
;
//# sourceMappingURL=my.js.map