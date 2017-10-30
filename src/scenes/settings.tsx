import * as React from 'react';
import { View, Text } from 'react-native';
import {
    Progress, WhiteSpace, Toast,
    ActivityIndicator, List,
    Button, SearchBar, Modal
} from 'antd-mobile';
import { TcpManager } from '../utils/tcp';
import DvcSvc from '../utils/dvc-svc';
import OrderSvc from '../utils/order-svc';
import PullToScroll from '../components/pull-to-scroll';

const prompt = Modal.prompt;
export default class SettingScreen extends React.Component {
    static navigationOptions = {
        title: '温控设置'
    }

    public state = {
        list: [],
        refreshing: false,
        enableLoad: true,
        percent: 10,
        params: { customerPhone: '' },
        focused: false,
        searchText: '',
        connecting: false,
        loadingText: '正在连接温控热点(York)...'
    }

    _page = 1
    _pageSize = 10

    componentDidMount() {
        const { state } = this.props['navigation'];

        console.log(state.params);

        if (!state.params) return;

        this.setState({ params: state.params })
        this._loadList();
    }

    _loadList() {

        this.setState({ refreshing: true });

        DvcSvc.list(this.state.params.customerPhone, this._page++, this._pageSize).then(res => {

            let list = res.list.concat(this.state.list)
            this.setState({
                list: res.list,
                enableLoad: (res.page - 1) * res.limit + res.list.length < res.total,
                refreshing: false
            });

        })
    }

    onConfigWIFI() {
        const { state } = this.props['navigation'];

        this.setState({
            connecting: true
        });

        setTimeout(() => {
            this.setState({ connecting: false });
        }, 2000);

        TcpManager.tryConnect(data => {
            alert(data);

            if (state.params && data.indexOf('MAC:') === 0) {
                let MAC = (data + '').split(':')[1];
                let order = state.params.data;

                DvcSvc.create(order.customerAddress, order.customerPhone, MAC).then(res => {
                    console.log('Device Created Success: ', res);
                }, console.error);
            }
        }).then(client => {

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

                    Toast.show('正在配置...');

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
                </List>

                <PullToScroll
                    dataArray={this.state.list}
                    renderRow={this._renderResults.bind(this)}
                    onRefresh={function () {
                        if (!this.state.enableLoad) return;

                        this._loadList();
                    }.bind(this)}
                    refreshing={this.state.refreshing}
                    enableRefresh={this.state.enableLoad}
                ></PullToScroll>
            </View >
        );
    }

    _renderResults(item) {
        const { navigate } = this.props['navigation'];

        return <List.Item multipleLine arrow="horizontal" onClick={e => {
            navigate('SettingDetail', { data: item });
        }}>
            {item.location} <List.Item.Brief>{item.contact}</List.Item.Brief>
        </List.Item>
    }
};