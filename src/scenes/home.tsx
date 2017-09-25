import * as React from 'react';
import { View, Image, AppRegistry } from 'react-native';
import { Grid, WhiteSpace } from 'antd-mobile';
import { StackNavigator } from 'react-navigation';
import layouts from '../style/layout';
import Logo from '../components/logo';

const menus = [{
    'icon': 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
    'text': '待维修',
    'screen': 'Request'
}, {
    'icon': 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
    'text': '已完成',
    'screen': 'Finished'
}, {
    'icon': 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
    'text': '配置',
    'screen': 'Settings'
}, {
    'icon': 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
    'text': '我的',
    'screen': 'My'
}];

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: '主页',
    };
    render() {
        const { navigate } = this.props['navigation'];
        return (
            <View style={layouts.container}>

                <Logo />
                <WhiteSpace size="xl" />
                <Grid data={menus}
                    columnNum={2}
                    hasLine={true}
                    onClick={(el, index) => {
                        navigate(menus[index].screen);
                    }}
                />
            </View>
        );
    }
}
