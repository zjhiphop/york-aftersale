import API from './api';
import { AsyncStorage } from 'react-native';

const PATH = {
    LIST: '/order',
    DETAIL: '/order/',
    DONE: '/order/{id}/done'
}

let OrderSvc = {
    list() {
        return API.post(PATH.LIST)
    },
    detail(id) {
        return API.get(PATH.DETAIL + id);
    },
    setDone(id) {
        return API.post(PATH.DONE.replace('{id}', id));
    }
}

export default OrderSvc;