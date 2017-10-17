import { Toast } from 'antd-mobile';
import API from './api';
import { AsyncStorage } from 'react-native';

const PATH = {
    LOGIN: '/user/login',
    CHANGE_PASS: '/user/changePassword'
};

let user;

AsyncStorage.getItem('user').then(res => {
    user = JSON.parse(res || '{}');
});

let UserSvc = {
    login(phone, pass) {
        return API.post(PATH.LOGIN, {
            phone: phone,
            password: pass
        }).then(res => {
            AsyncStorage.setItem('token', res.token);
            AsyncStorage.setItem('user', JSON.stringify(res.user));
            API.updateToken(res.token);
            user = res.user;

            console.log(user);

            return res;
        })
    },

    changePass(oldPass, newPass, confirmPass) {
        return API.post(PATH.CHANGE_PASS, {
            _id: user.id,
            oldPassword: oldPass,
            newPassword: newPass,
            confirmPassword: confirmPass
        });
    },

    getGatesList() {

    }
}

export default UserSvc;