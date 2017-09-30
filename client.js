// jshint esversion:6

const net = require('net');
const socket = new net.connect(6969, function() {
  this.on('data', (chunk) => {
    console.log(chunk.toString());
  });
});

socket.on('error', (err) => {
  throw err;
});

// socket.connect(6969, '0.0.0.0');