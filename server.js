// jshint esversion:6
// telnet localhost 'port#'
const net = require('net');
process.stdin.setEncoding('utf8');

const server = net.createServer((client) => {
  console.log('Server: Client Connected');
  client.on('data', (data) => {
    console.log(data.toString());
  });

  client.on('end', () => {
    console.log('Server: Client disconnected');
  });

  client.write('Server says: Hello client!\n');
  client.pipe(client);

  });

server.on('error', (err) => {
  throw err;
});

server.listen(6969, '0.0.0.0', () => {
  console.log('Server Connected');
});

  // server.on('data', (data) => {
  //   console.log(data.toString());
  //   server.end();
  // });