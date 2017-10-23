import * as React from 'react';
import { View, Text } from 'react-native';
import {
    Progress, WhiteSpace,
    ActivityIndicator, List,
    Button, SearchBar, Modal
} from 'antd-mobile';
import { TcpManager } from '../utils/tcp';
import DvcSvc from '../utils/dvc-svc'
const prompt = Modal.prompt;
export default class SettingScreen extends React.Component {
    static navigationOptions = {
        title: '温控设置'
    }

    public state = {
        list: [],
        percent: 10,
        focused: false,
        searchText: '',
        connecting: false,
        loadingText: '正在连接温控热点(York)...'
    }
    componentDidMount() {
        const { state } = this.props['navigation'];

        console.log(state.params);

        if (!state.params.data) return;

        DvcSvc.list(state.params.data.customerPhone).then(res => {

            this.setState({
                list: res.list
            });

        })
    }

    onConfigWIFI() {
        this.setState({
            connecting: true
        });

        setTimeout(() => {
            this.setState({ connecting: false });
        }, 2000);

        TcpManager.tryConnect().then(client => {

            this.setState({ connecting: false });

            /**
             * Exp1：“SSID:HUAWEIKEY:12345678”//有加密Exp2：
             * “SSID:HUAWEIKEY:NONE”//开放，无加密
             */
            prompt(
                'WIFI配置',
                '请输入WIFI SSID和密码',
                (ssid, pass) => {

                    this.setState({
                        loadingText: `正在配置温控SSID和密码: SSID:${ssid}KEY:${pass}`
                    });

                    setTimeout(() => {
                        client['write'](`SSID:${ssid}KEY:${pass}`);
                    }, 50);
                },
                'login-password'
            );

        });

    }
    render() {
        const { navigate } = this.props['navigation'];
        return (
            <View>
                <WhiteSpace />
                <Button onClick={e => {
                    this.onConfigWIFI();
                }}>配置温控WIFI</Button>
                <ActivityIndicator
                    toast
                    text={this.state.loadingText}
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
                            setTimeout(e => {
                                DvcSvc.list(value).then(res => {
                                    console.log(res);
                                    this.setState({ list: res.list });
                                }).catch(e => console.error);
                            }, 100);
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

                    {
                        this.state.list.map(item => {
                            return <List.Item multipleLine arrow="horizontal" onClick={e => {
                                navigate('SettingDetail', { data: item });
                            }}>
                                {item.location} <List.Item.Brief>{item.contact}</List.Item.Brief>
                            </List.Item>
                        })
                    }

                </List>
            </View >
        );
    }
};