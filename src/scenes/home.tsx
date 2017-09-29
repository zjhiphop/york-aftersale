import * as React from 'react';
import { View, Text, Image, AppRegistry } from 'react-native';
import { Grid, WhiteSpace } from 'antd-mobile';
import { StackNavigator } from 'react-navigation';
import layouts from '../style/layout';
import Logo from '../components/logo';
import SplashScreen from 'react-native-splash-screen';

import FixICON from '../assets/fix.png';
import FinishedICON from '../assets/finish.png';
import MyICON from '../assets/my.png';
import ConfigICON from '../assets/config.png';

const menus = [{
    'icon': FixICON,
    'text': '待维修',
    'screen': 'Request'
}, {
    'icon': FinishedICON,
    'text': '已完成',
    'screen': 'Finished'
}, {
    'icon': ConfigICON,
    'text': '配置',
    'screen': 'Settings'
}, {
    'icon': MyICON,
    'text': '我的',
    'screen': 'My'
}];

export default class HomeScreen extends React.Component {
    componentDidMount() {
        SplashScreen.hide();
    }
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
                    renderItem={dataItem => (
                        <View style={{ padding: 10, alignItems: 'center' }}>
                            <Image source={dataItem.icon} style={{ width: 30, height: 30 }} />
                            <View style={{ marginTop: 12 }}>
                                <Text style={{ fontSize: 18, color: 'rgba(0, 0, 160, .6)' }}>{dataItem.text}</Text>
                            </View>
                        </View>
                    )}
                />
            </View>
        );
    }
}
