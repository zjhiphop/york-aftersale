import { API_CONFIG } from './../constants';
import { AsyncStorage } from 'react-native';

class API {
    server: string;
    token: string;
    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }

    constructor(config) {
        this.server = config.server;
        this.headers = config.headers || this.headers;

        AsyncStorage.getItem('token').then(token => this.token = token)
    }

    async get(path) {
        try {
            let response = await fetch(this.server + path, {
                method: 'GET',
                headers: this.headers,
                body: null
            });
            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    async post(path, data?) {
        try {
            data = data || {};
            data.token = this.token;

            let response = await fetch(this.server + path, {
                method: 'POST',
                headers: this.headers,
                body: data
            });
            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }
}

let instance = new API(API_CONFIG);

export default instance;