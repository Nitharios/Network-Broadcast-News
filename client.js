// jshint esversion:6

const net = require('net');
const socket = new net.connect(6969, function() {
  console.log('Connected to server!');
});

socket.on('data', function(data) {
  console.log(data.toString());
  // socket.end();
});

socket.on('error', (err) => {
  throw err;
});

// socket.connect(6969, '0.0.0.0');