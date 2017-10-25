import { API_CONFIG } from './../constants';
import { AsyncStorage } from 'react-native';
import { Toast } from 'antd-mobile';
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

        AsyncStorage.getItem('token').then(token => this.headers['User-Token'] = token)
    }

    updateToken(token) {
        this.headers['User-Token'] = token;
    }


    onFetchError(error) {
        console.log(error);
    }

    async get(path, data?) {
        try {

            data = data || {};

            let promise = fetch(this.server + path, {
                method: 'GET',
                headers: this.headers
            });

            let response = await promise;

            promise.catch(this.onFetchError.bind(this));

            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    req(path, data, type) {
        return new Promise<any>(async (resolve, reject) => {

            try {
                data = data || {};

                console.log(this.headers);

                let promise = fetch(this.server + path, {
                    method: type,
                    headers: this.headers,
                    body: JSON.stringify(data)
                });

                promise.catch(this.onFetchError.bind(this));

                let response = await promise;
                let jsonResult = await response.json();

                if (jsonResult.errMsg) {
                    reject(jsonResult);
                    return Toast.info(jsonResult.errMsg);
                }

                resolve(jsonResult);

            } catch (error) {
                console.error(error);
                reject(error);
            }
        }).catch(console.error);
    }

    async post(path, data?) {
        return this.req(path, data, 'POST');
    }

    async put(path, data?) {
        return this.req(path, data, 'PUT');
    }
}

let instance = new API(API_CONFIG);

export default instance;