// TCP server
var net = require('net');

net.createServer(function (socket) {
    console.log('socket connected');
    socket.on('data', function (data) {
        var line = data.toString();
        console.log('got "data"', line);
        socket.write('hello from tcp server' + new Date());
    });
    socket.on('end', function () {
        console.log('end');
    });
    socket.on('close', function () {
        console.log('close');
    });
    socket.on('error', function (e) {
        console.log('error ', e);
    });

}).listen(3080, function () {
    console.log('TCP Server is listening on port 3080');
});