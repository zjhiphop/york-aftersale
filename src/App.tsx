import * as React from 'react';
import { View, Image, AppRegistry } from 'react-native';
import { Grid, WhiteSpace } from 'antd-mobile';
import { StackNavigator } from 'react-navigation';
import layouts from './style/layout';
import FinishedScreen from './scenes/finished';
import MyScreen from './scenes/my';
import RequestScreen from './scenes/request';
import SettingScreen from './scenes/settings';
import SettingDetailScreen from './scenes/setting-detail';
import ResetPassScreen from './scenes/resetpass';

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

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: '主页',
    };
    render() {
        const { navigate } = this.props['navigation'];
        return (
            <View style={layouts.container}>

                <Image
                    style={{ width: 191, height: 68 }}
                    source={require('./assets/logo.png')}
                />
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


const App = StackNavigator({
    Home: { screen: HomeScreen },
    My: { screen: MyScreen },
    Settings: { screen: SettingScreen },
    Request: { screen: RequestScreen },
    Finished: { screen: FinishedScreen },
    SettingDetail: { screen: SettingDetailScreen },
    ResetPass: { screen: ResetPassScreen }
});

export default App;

AppRegistry.registerComponent('App', () => App);
