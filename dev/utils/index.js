const net = require('net');

//function to know if a port is in use

function portInUse (port, callback) {
    const server = net.createServer(function(socket) {
      	socket.write('Echo server\r\n');
      	socket.pipe(socket);
    });

      server.listen(port, '127.0.0.1');

      server.on('error', function (e) {
	     callback(true);
     });

    server.on('listening', function (e) {
	       server.close();
	       callback(false);
    });
};

//CHANGE HERE YOUR DESIRABLE PORTS

const ports = [
  8000,
  3000,
  5000
];

module.exports = {
  portInUse: portInUse,
  ports: ports
};
