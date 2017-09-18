import * as React from 'react';
import App from './App';
import * as net from 'react-native-tcp';

import * as renderer from 'react-test-renderer';

it('renders without crashing', () => {
    const rendered = renderer.create(<App />).toJSON();
    expect(rendered).toBeTruthy();
});

it('Socket server could be connected', () => {
    // var server = net.createServer(function(socket) {
    //     socket.write('excellent!');
    // }).listen(12345);

    // var client = net.createConnection(12345);

    // expect(client).toBeDefined();

    // client.on('error', function(error) {
    //     console.log(error);
    // });

    // client.on('data', function(data) {
    //     console.log('message was received', data);
    // });
});