import API from './api';
import { AsyncStorage } from 'react-native';

const PATH = {
    LIST: '/order',
    DETAIL: '/order/',
    DONE: '/order/{id}/done'
}

let OrderSvc = {
    list(status?) {
        status = status || 0;
        return API.get(PATH.LIST + '?status=' + status);
    },
    detail(id) {
        return API.get(PATH.DETAIL + id);
    },
    setDone(id) {
        return API.post(PATH.DONE.replace('{id}', id));
    }
}

export default OrderSvc;