import * as React from 'react';
import { View, Text } from 'react-native';
import { WhiteSpace, ActivityIndicator, List, SearchBar } from 'antd-mobile';
export default class SettingScreen extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            percent: 10,
            focused: false,
            searchText: ''
        };
    }
    render() {
        const { navigate } = this.props['navigation'];
        return (React.createElement(View, null,
            React.createElement(WhiteSpace, null),
            React.createElement(Text, null, "\u6B63\u5728\u68C0\u6D4B\u70ED\u70B9..."),
            React.createElement(ActivityIndicator, null),
            React.createElement(WhiteSpace, null),
            React.createElement(List, { renderHeader: () => '温控搜索' },
                React.createElement(SearchBar, { placeholder: "请输入用户手机号", focused: this.state.focused, onFocus: () => {
                        this.setState({
                            focused: false,
                        });
                    }, onSubmit: value => {
                        alert('正在搜索：' + value);
                    }, onCancel: e => {
                        this.setState({
                            focused: false,
                        });
                    } })),
            React.createElement(WhiteSpace, null),
            React.createElement(List, { renderHeader: () => '温控列表' },
                React.createElement(List.Item, { multipleLine: true, arrow: "horizontal", onClick: e => {
                        navigate('SettingDetail');
                    } },
                    "\u6E29\u63A71 ",
                    React.createElement(List.Item.Brief, null, "\u6545\u969C\uFF1A\u65E0")),
                React.createElement(List.Item, { multipleLine: true, arrow: "horizontal" },
                    "\u6E29\u63A72 ",
                    React.createElement(List.Item.Brief, null, "\u6545\u969C\uFF1AA01")),
                React.createElement(List.Item, { multipleLine: true, arrow: "horizontal" },
                    "\u6E29\u63A73 ",
                    React.createElement(List.Item.Brief, null, "\u6545\u969C\uFF1AA02")),
                React.createElement(List.Item, { multipleLine: true, arrow: "horizontal" },
                    "\u6E29\u63A74 ",
                    React.createElement(List.Item.Brief, null, "\u6545\u969C\uFF1A\u65E0")),
                React.createElement(List.Item, { multipleLine: true, arrow: "horizontal" },
                    "\u6E29\u63A75 ",
                    React.createElement(List.Item.Brief, null, "\u6545\u969C\uFF1A\u65E0")))));
    }
}
SettingScreen.navigationOptions = {
    title: '温控设置'
};
;
//# sourceMappingURL=settings.js.map