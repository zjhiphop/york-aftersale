import API from './api';
import { AsyncStorage } from 'react-native';
import { ORDER_STATUS } from './misc';

const PATH = {
    LIST: '/order',
    DETAIL: '/order/',
    DONE: '/order/{id}/done'
}

let OrderSvc = {
    list(status?) {
        status = status || ORDER_STATUS.BEFORE_ASSIGN;
        return API.get(PATH.LIST + '?status=' + status);
    },
    detail(id) {
        return API.get(PATH.DETAIL + id);
    },
    setDone(id) {
        return API.put(PATH.DONE.replace('{id}', id));
    }
}

export default OrderSvc;