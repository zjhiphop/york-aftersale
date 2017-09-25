import * as React from 'react';
import { View, Text } from 'react-native';
import { InputItem, List, Button, Toast } from 'antd-mobile';
import UserSvc from '../utils/user-svc';

export default class ResetPassScreen extends React.Component {
    static navigationOptions = {
        title: '密码重置',
    };
    labelFocusInst;

    state = {
        oldpass: '',
        newpass1: '',
        newpass2: ''
    }

    submit() {
        if (this.state.newpass1 === '' ||
            this.state.newpass1 !== this.state.newpass2) {
            return Toast.show("新密码不匹配!");
        }

        UserSvc.changePass(this.state.oldpass, this.state.newpass1, this.state.newpass2)
            .then(res => {
                Toast.show("密码保存成功！");
            });
    }

    render() {
        return (
            <View>
                <List>
                    <List.Item extra="Jade">用户名</List.Item>
                    <InputItem
                        placeholder="输入老密码"
                        onChange={value => {
                            this.setState({
                                oldpass: value
                            });
                        }}
                    ></InputItem>
                    <InputItem
                        placeholder="输入新密码"
                        onChange={value => {
                            this.setState({
                                newpass1: value
                            });
                        }}
                    ></InputItem>
                    <InputItem
                        placeholder="再次输入新密码"
                        onChange={value => {
                            this.setState({
                                newpass2: value
                            });
                        }}
                    ></InputItem>
                    <List.Item extra={
                        <Button type='primary' size='large' onClick={e => {
                            this.submit();
                        }}>提交</Button>
                    }></List.Item>
                </List >
            </View >
        );
    }
};