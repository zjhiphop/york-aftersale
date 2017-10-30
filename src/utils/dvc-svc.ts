
import API from './api';
import { AsyncStorage } from 'react-native';

const PATH = {
    LIST: '/device',
    UPDATE: '/devive/'
}

const PageSize = 25;

let DvcSvc = {
    list(q, page = 0, limit = PageSize) {
        return API.get(PATH.LIST + `?page=${page}&limit=${limit}&query=${q}`);
    },

    update(id, location) {
        return API.put(PATH.UPDATE + `?id=${id}`, {
            location: location
        });
    },

    create(mac, contact, loc) {
        return API.post(PATH.LIST, {
            mac: mac,
            contact: contact,
            location: loc
        });
    }
}

export default DvcSvc;