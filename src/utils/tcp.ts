import { TCP_CONFIG } from '../constants';
var net = require('net');
import { Toast } from 'antd-mobile';
export var TcpManager = {
    client: null,
    isConnected: false,
    tryConnect(onData?) {
        this.onData = onData || function () { };
        return new Promise((resolve, reject) => {
            try {
                if (this.client && this.isConnected) {
                    return resolve(this.client)
                }

                this.client = net.createConnection(TCP_CONFIG.port, TCP_CONFIG.host, () => {

                    Toast.show('York服务器已连接');
                    this.isConnected = true;
                    // this.client.write('Hello, server! Love, Client.');
                    this.initEvents();

                    resolve(this.client);
                });
            } catch (e) {
                reject(e);
            }
        })
    },

    initEvents() {
        if (!this.client) return;

        this.client.on('data', data => {
            console.log('Received: ' + data);
            this.onData(data);
        });

        this.client.on('close', () => {
            this.isConnected = false;
            this.destory();
        });
    },

    destory() {
        this.isConnected = false;
        this.client && this.client.destroy(); // kill client after server's response
    }
};