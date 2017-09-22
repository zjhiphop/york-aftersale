import * as React from 'react';
import App from './App';
import * as renderer from 'react-test-renderer';
var net = require('net');
it('renders without crashing', () => {
    const rendered = renderer.create(React.createElement(App, null)).toJSON();
    expect(rendered).toBeTruthy();
});
it('Socket server could be connected', () => {
    var client = net.createConnection(3080, '192.168.9.106', function () {
        console.log('Connected');
        client.write('Hello, server! Love, Client.');
    });
    client.on('data', function (data) {
        console.log('Received: ' + data);
        client.destroy(); // kill client after server's response
    });
    client.on('close', function () {
        console.log('Connection closed');
    });
});
//# sourceMappingURL=App.test.js.map