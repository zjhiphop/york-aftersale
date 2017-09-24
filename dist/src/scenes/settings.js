import * as React from 'react';
import { View, Text } from 'react-native';
import { WhiteSpace, ActivityIndicator, List, Button, SearchBar, Modal } from 'antd-mobile';
import { TcpManager } from '../utils/tcp';
const prompt = Modal.prompt;
export default class SettingScreen extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            percent: 10,
            focused: false,
            searchText: '',
            connecting: false
        };
    }
    onConfigWIFI() {
        this.setState({
            connecting: true
        });
        setTimeout(() => {
            this.setState({ connecting: false });
        }, 2000);
        TcpManager.tryConnect().then(client => {
            /**
             * Exp1：“SSID:HUAWEIKEY:12345678”//有加密Exp2：
             * “SSID:HUAWEIKEY:NONE”//开放，无加密
             */
            prompt('WIFI配置', '请输入WIFI SSID和密码', (ssid, pass) => {
                alert(`SSID:${ssid}KEY:${pass}`);
                client['write'](`SSID:${ssid}KEY:${pass}`);
            }, 'login-password');
            this.setState({ connecting: false });
        });
    }
    render() {
        const { navigate } = this.props['navigation'];
        return (React.createElement(View, null,
            React.createElement(WhiteSpace, null),
            React.createElement(Text, null, "\u6B63\u5728\u68C0\u6D4B\u70ED\u70B9..."),
            React.createElement(ActivityIndicator, null),
            React.createElement(Button, { onClick: e => {
                    this.onConfigWIFI();
                } }, "\u914D\u7F6E\u6E29\u63A7WIFI"),
            React.createElement(ActivityIndicator, { toast: true, text: "正在连接...", animating: this.state.connecting }),
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