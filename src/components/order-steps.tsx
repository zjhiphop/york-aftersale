/**
 * Example: 
 *  <OrderSteps current={this.state.data.status}></OrderSteps> 
 */
import * as React from 'react';
import {
    StyleSheet, View
} from 'react-native';
import {
    Steps
} from 'antd-mobile';

const Step = Steps.Step;

const steps = [{
    title: '待分配'
}, {
    title: '已分配'
}, {
    title: '已接单'
}, {
    title: '已完成'
}, {
    title: '已确认'
}, {
    title: '已关闭'
}].map((s, i) => <Step key={i} title={s.title} />);

export default class OrderSteps extends React.Component<{ current }> {
    render() {
        return (
            <View>
                <Steps current={this.props.current} direction="horizontal">{steps}</Steps>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    picture: {
        flex: 1,
        width: null,
        height: null
    },
});