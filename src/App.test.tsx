import * as React from 'react';
import App from './App';
import * as renderer from 'react-test-renderer';

var net = require('net');

it('renders without crashing', () => {
    const rendered = renderer.create(<App />).toJSON();
    expect(rendered).toBeTruthy();
});

it('Socket server could be connected', () => {

    var client = new net.Socket();
    client.connect(3080, '127.0.0.1', function() {
        console.log('Connected');
        client.write('Hello, server! Love, Client.');
    });

    client.on('data', function(data) {
        console.log('Received: ' + data);
        client.destroy(); // kill client after server's response
    });

    client.on('close', function() {
        console.log('Connection closed');
    });
});