import * as React from 'react';
import { View, Text } from 'react-native';
import {
    Progress, WhiteSpace,
    ActivityIndicator, List,
    Button, SearchBar, Modal
} from 'antd-mobile';
import { TcpManager } from '../utils/tcp';

const prompt = Modal.prompt;
export default class SettingScreen extends React.Component {
    static navigationOptions = {
        title: '温控设置'
    }

    public state = {
        percent: 10,
        focused: false,
        searchText: '',
        connecting: false
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
            prompt(
                'WIFI配置',
                '请输入WIFI SSID和密码',
                (ssid, pass) => {
                    alert(`SSID:${ssid}KEY:${pass}`);
                    client['write'](`SSID:${ssid}KEY:${pass}`);
                },
                'login-password'
            );

            this.setState({ connecting: false });

        });

    }
    render() {
        const { navigate } = this.props['navigation'];
        return (
            <View>
                <WhiteSpace />
                <Text>正在检测热点...</Text><ActivityIndicator></ActivityIndicator>
                <Button onClick={e => {
                    this.onConfigWIFI();
                }}>配置温控WIFI</Button>
                <ActivityIndicator
                    toast
                    text="正在连接..."
                    animating={this.state.connecting}
                />
                <WhiteSpace />
                <List renderHeader={() => '温控搜索'}>
                    <SearchBar
                        placeholder="请输入用户手机号"
                        focused={this.state.focused}
                        onFocus={() => {
                            this.setState({
                                focused: false,
                            });
                        }}
                        onSubmit={value => {
                            alert('正在搜索：' + value);
                        }}
                        onCancel={e => {
                            this.setState({
                                focused: false,
                            })
                        }}
                    />
                </List>
                <WhiteSpace />
                <List renderHeader={() => '温控列表'}>
                    <List.Item multipleLine arrow="horizontal" onClick={e => {
                        navigate('SettingDetail');
                    }}>
                        温控1 <List.Item.Brief>故障：无</List.Item.Brief>
                    </List.Item>
                    <List.Item multipleLine arrow="horizontal">
                        温控2 <List.Item.Brief>故障：A01</List.Item.Brief>
                    </List.Item>
                    <List.Item multipleLine arrow="horizontal">
                        温控3 <List.Item.Brief>故障：A02</List.Item.Brief>
                    </List.Item>
                    <List.Item multipleLine arrow="horizontal">
                        温控4 <List.Item.Brief>故障：无</List.Item.Brief>
                    </List.Item>
                    <List.Item multipleLine arrow="horizontal">
                        温控5 <List.Item.Brief>故障：无</List.Item.Brief>
                    </List.Item>
                </List>
            </View >
        );
    }
};