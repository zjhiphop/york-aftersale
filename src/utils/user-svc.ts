import API from './api';
import { AsyncStorage } from 'react-native';

const PATH = {
    LOGIN: '/user/login',
    CHANGE_PASS: '/user/changePassword'
}

let UserSvc = {
    login(phone, pass) {
        return API.post(PATH.LOGIN, {
            phone: phone,
            password: pass
        }).then(res => {
            AsyncStorage.setItem('token', res.token);

        })
    },

    changePass(oldPass, newPass, confirmPass) {
        return API.post(PATH.CHANGE_PASS, {
            oldPassword: oldPass,
            newPassword: newPass,
            confirmPassword: confirmPass
        });
    }
}

export default UserSvc;