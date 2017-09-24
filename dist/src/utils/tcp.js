import { TCP_CONFIG } from '../constants';
var net = require('net');
export var TcpManager = {
    client: null,
    isConnected: false,
    tryConnect() {
        return new Promise((resolve, reject) => {
            try {
                if (this.client && this.isConnected) {
                    return resolve(this.client);
                }
                this.client = net.createConnection(TCP_CONFIG.port, TCP_CONFIG.host, () => {
                    this.isConnected = true;
                    // this.client.write('Hello, server! Love, Client.');
                    this.initEvents();
                    resolve(this.client);
                });
            }
            catch (e) {
                reject(e);
            }
        });
    },
    initEvents() {
        if (!this.client)
            return;
        this.client.on('data', data => {
            alert('Received: ' + data);
        });
        this.client.on('close', () => {
            this.isConnected = false;
            alert('Connection closed');
        });
    },
    destory() {
        this.isConnected = false;
        this.client && this.client.destroy(); // kill client after server's response
    }
};
//# sourceMappingURL=tcp.js.map