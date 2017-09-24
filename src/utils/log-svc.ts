
import API from './api';
import { AsyncStorage } from 'react-native';

const PATH = {
    LIST: '/opreateHistory'
}

let LogSvc = {
    historyList() {
        return API.post(PATH.LIST)
    }
}

export default LogSvc;