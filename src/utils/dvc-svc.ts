
import API from './api';
import { AsyncStorage } from 'react-native';

const PATH = {
    LIST: '/device',
    UPDATE: '/devive/'

}

let DvcSvc = {
    list(q) {
        return API.get(PATH.LIST + `?query=${q}`);
    },
    update(id, location) {
        return API.put(PATH.UPDATE + `?id=${id}`, {
            location: location
        });
    }
}

export default DvcSvc;