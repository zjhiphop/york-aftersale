import * as React from 'react';
import { View, Text } from 'react-native';
import {
    Progress, WhiteSpace,
    ActivityIndicator, List,
    Button, SearchBar
} from 'antd-mobile';

export default class SettingScreen extends React.Component {
    static navigationOptions = {
        title: '温控设置'
    };
    state = {
        percent: 10,
        focused: false,
        searchText: ''
    };
    render() {
        const { navigate } = this.props['navigation'];
        return (
            <View>
                <WhiteSpace />
                <Text>正在检测热点...</Text><ActivityIndicator></ActivityIndicator>
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