import * as React from 'react';
import { View, Text } from 'react-native';
import { InputItem, List, Button } from 'antd-mobile';

export default class ResetPassScreen extends React.Component {
    static navigationOptions = {
        title: '密码重置',
    };
    labelFocusInst;

    render() {
        return (
            <View>
                <List>
                    <List.Item extra="Jade">用户名</List.Item>
                    <InputItem
                        placeholder="输入老密码"
                    ></InputItem>
                    <InputItem
                        placeholder="输入新密码"
                    ></InputItem>
                    <InputItem
                        placeholder="再次输入新密码"
                    ></InputItem>
                    <List.Item extra={
                        <Button type='primary' size='large' onClick={e => {
                            alert('提交成功！')
                        }}>提交</Button>
                    }></List.Item>
                </List >
            </View >
        );
    }
};