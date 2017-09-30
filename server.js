// jshint esversion:6
// telnet localhost 'port#'
const net = require('net');
process.stdin.setEncoding('utf8');

const server = net.createServer((client) => {
  // 'connection listener'
  console.log('client connected');
  // console.log(client);
  client.on('data', (data) => {
    console.log(data.toString());
  });

  client.on('end', () => {
    console.log('client disconnected');
  });

  client.write('Server says: Hello client!\n');
  client.pipe(client);

  });

server.on('error', (err) => {
  throw err;
});

  // server.on('data', (data) => {
  //   console.log(data.toString());
  //   server.end();
  // });

server.listen(6969, '0.0.0.0', () => {
  console.log('Server Connected');
});