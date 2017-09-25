import { Client, Message } from 'react-native-paho-mqtt';
import { EventRegister } from 'react-native-event-listeners';
import { w3cwebsocket as webSocket } from 'websocket';
//Set up an in-memory alternative to global localStorage 
const myStorage = {
    setItem: (key, item) => {
        myStorage[key] = item;
    },
    getItem: (key) => myStorage[key],
    removeItem: (key) => {
        delete myStorage[key];
    }
};
export default class Mqtt {
    constructor(config) {
        config.host = config.host || 'live.chinabolang.com';
        config.port = config.port || 3000;
        this.client = new Client({
            uri: `ws://${config.host}:${config.port}/mqtt`,
            clientId: 'RN_YORK',
            storage: myStorage,
            webSocket: webSocket
        });
        // set event handlers 
        this.client.on('connectionLost', (responseObject) => {
            if (responseObject.errorCode !== 0) {
                console.log(responseObject.errorMessage);
            }
        });
        this.client.on('messageReceived', (message) => {
            console.log(message.payloadString);
            let topic = message.destinationName, payload = message.payloadString || message.payloadBytes;
            // parse message and publish via global event bus
            EventRegister.emit(message.destinationName, payload);
        });
        this.connect().then(() => {
            return this.client.subscribe.apply(this.client, config.topics || []);
        });
    }
    disconnect() {
        try {
            this.client.disconnect();
        }
        catch (e) {
        }
    }
    connect() {
        /**
        *
        *
           type ConnectOptions = {
               userName?: string,
               password?: string,
               willMessage?: Message,
               timeout?: number,
               keepAliveInterval: number,
               useSSL: boolean,
               cleanSession: boolean,
               mqttVersion: number,
               allowMqttVersionFallback: boolean,
               uris?: string[]
           }
        */
        // connect the client 
        return this.client.connect({
            userName: 'admin',
            password: 'public'
        })
            .then(() => {
            // Once a connection has been made, make a subscription and send a message. 
            console.log('onConnect');
            return this.client.subscribe('World');
        })
            .then(() => {
            const message = new Message('Hello');
            message.destinationName = 'World';
            this.client.send(message);
        })
            .catch((responseObject) => {
            if (responseObject.errorCode !== 0) {
                console.log('onConnectionLost:' + responseObject.errorMessage);
            }
        });
    }
}
//# sourceMappingURL=mqtt.js.map