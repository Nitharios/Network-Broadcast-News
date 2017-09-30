// jshint esversion:6

// telnet localhost 'port#'
const net = require('net');
const server = net.createServer((c) => {
  // 'connection listener'
  console.log('client connected');
  c.on('end', () => {
    console.log('client disconnected');
  });
  c.write('hello\r\n');
  c.pipe(c);

  });

server.on('error', (err) => {
  throw err;
});

server.listen(6969, '0.0.0.0', () => {
  console.log('server bound');
});