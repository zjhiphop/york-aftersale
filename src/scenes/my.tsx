import * as React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { InputItem, List, Button, WhiteSpace } from 'antd-mobile';

export default class MyScreen extends React.Component {

    componentWillMount() {
        AsyncStorage.getItem('user').then(user => {
            this.setState({ user: JSON.parse(user) })
        })
    }

    static navigationOptions = {
        title: '个人设置',
    };
    labelFocusInst;

    state = {
        user: {
            name: ''
        }
    }

    render() {

        const { navigate } = this.props['navigation'];

        return (
            <View>
                <List>
                    <List.Item extra={this.state.user.name}>用户名</List.Item>
                    <List.Item arrow="horizontal" onClick={e => {
                        navigate('ResetPass', { name: this.state.user.name });
                    }}>密码修改</List.Item>
                    <List.Item arrow="horizontal" onClick={e => {
                        navigate('History')
                    }}>操作记录</List.Item>
                    <List.Item arrow="horizontal" onClick={e => {
                        navigate('About')
                    }}>关于</List.Item>
                </List >
                <WhiteSpace size="xl" />
                <Button type="primary">退出登录</Button>
            </View >
        );
    }
};