import * as React from 'react';
import { View, Text } from 'react-native';
import { Card, WingBlank, WhiteSpace, Badge } from 'antd-mobile';
import call from 'react-native-phone-call'

export default class RequestScreen extends React.Component {
    static navigationOptions = {
        title: '已完成单'
    };
    render() {
        return (
            <View>
                <WingBlank size="lg">
                    <WhiteSpace size="lg" />
                    <Card>
                        <Card.Header
                            title="付竫"
                            thumb="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png"
                            extra={<Text onPress={e => {

                                const args = {
                                    number: '1388888888888', // String value with the number to call
                                    prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
                                }

                                call(args).catch(console.error)

                            }} >1388888888888</Text>}
                        />
                        <Card.Body>
                            <Text> 空调故障：1F00 </Text>
                            <Text> 住址：无锡市万象城XX楼1号 </Text>
                        </Card.Body>
                        <Card.Footer content="2017-09-23 13:23:32" extra={
                            <Badge text="已完成"
                                style={{ position: 'absolute', right: 15 }}></Badge>} />
                    </Card>
                    <WhiteSpace size="lg" />
                    <Card>
                        <Card.Header
                            title="姜刚"
                            thumb="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png"
                            extra={<Text onPress={e => {

                                const args = {
                                    number: '1388888888888', // String value with the number to call
                                    prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
                                }

                                call(args).catch(console.error)

                            }} >1388888888888</Text>}
                        />
                        <Card.Body>
                            <Text> 空调故障：1F00 </Text>
                            <Text> 住址：无锡市万象城XX楼1号 </Text>
                        </Card.Body>
                        <Card.Footer content="2017-09-23 13:23:32" extra={
                            <Badge text="已完成"
                                style={{ position: 'absolute', right: 15 }}></Badge>} />
                    </Card>
                </WingBlank>
            </View>
        );
    }
};