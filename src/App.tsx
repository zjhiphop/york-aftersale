import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button, Grid, WhiteSpace } from 'antd-mobile';
import layouts from './style/layout';

const menus = [{
    'icon': 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
    'text': '待维修'
}, {
    'icon': 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
    'text': '已完成'
}, {
    'icon': 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
    'text': '配置'
}, {
    'icon': 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
    'text': '我的'
}];

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>

                <Image
                    style={{ width: 191, height: 68 }}
                    source={require('./assets/logo.png')}
                />
                <WhiteSpace size="xl" />
                <Grid data={menus}
                    columnNum={2}
                    hasLine={true}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
