import { Client, Message } from 'react-native-paho-mqtt';
import { EventRegister } from 'react-native-event-listeners';
// import { w3cwebsocket as webSocket } from 'websocket';
import { getRandomCharByLen } from './misc';
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
let createMessage = (topic, payload, qos, retain) => {
    let message = new Paho.MQTT.Message(payload);
    message.destinationName = topic;
    message.qos = Number(qos) || 0;
    message.retained = !!retain;
    return message;
};
class Mqtt {
    constructor(config) {
        this.topics = [];
        config = config || {};
        config.host = config.host || 'live.chinabolang.com';
        config.port = config.port || 3000;
        this.client = new Client({
            uri: `ws://${config.host}:${config.port}/mqtt`,
            clientId: 'RN_YORK' + getRandomCharByLen(5),
            storage: myStorage
            // webSocket: webSocket
        });
        // set event handlers 
        this.client.on('connectionLost', (responseObject) => {
            if (responseObject.errorCode !== 0) {
                console.log(responseObject.errorMessage);
                this.connect();
            }
        });
        this.client.on('messageReceived', (message) => {
            console.log(message.payloadString);
            let topic = message.destinationName, payload = message.payloadString || message.payloadBytes;
            // parse message and publish via global event bus
            EventRegister.emit(message.destinationName, payload);
        });
        this.connect().then(() => {
            return this.client.subscribe.apply(this.client, this.topics || []);
        });
    }
    disconnect() {
        try {
            this.client.disconnect();
        }
        catch (e) {
        }
    }
    subscribe(clientTopics) {
        this.topics = this.topics.concat(clientTopics || []);
        if (this.client.isConnected()) {
            return this.client.subscribe.apply(this.client, this.topics || []);
        }
        else {
        }
    }
    onConnectSuccess() {
        this.client.subscribe.apply(this.client, this.topics || []);
    }
    /*topic: string | Message, payload: string, qos: 0 | 1 | 2, retained: boolean*/
    send(topic, payload) {
        this.client.send(topic, payload, 1, false);
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
        if (this.client.isConnected())
            return new Promise(resolver => {
                resolver(this.client);
            });
        // connect the client 
        return this.client.connect({
            userName: 'admin',
            password: 'public',
            onSuccess: this.onConnectSuccess.bind(this)
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
export default new Mqtt();
//# sourceMappingURL=mqtt.js.map