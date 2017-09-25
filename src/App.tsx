import * as React from 'react';
import { View, Image, AppRegistry } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import HomeScreen from './scenes/home';
import LoginScreen from './scenes/login';
import FinishedScreen from './scenes/finished';
import MyScreen from './scenes/my';
import RequestScreen from './scenes/request';
import SettingScreen from './scenes/settings';
import SettingDetailScreen from './scenes/setting-detail';
import ResetPassScreen from './scenes/resetpass';

const MainNav = StackNavigator({
    Home: { screen: HomeScreen },
    My: { screen: MyScreen },
    Settings: { screen: SettingScreen },
    Request: { screen: RequestScreen },
    Finished: { screen: FinishedScreen },
    SettingDetail: { screen: SettingDetailScreen },
    ResetPass: { screen: ResetPassScreen }
});

const App = StackNavigator({
    Login: { screen: LoginScreen },
    Main: { screen: MainNav },
}, {
        headerMode: 'none',
    });

export default App;

AppRegistry.registerComponent('App', () => App);
