// jshint esversion:6
// telnet localhost 'port#'
const net = require('net');
// process.stdin.setEncoding('utf8');

let clientInfo = [];

const server = net.createServer((client) => {
  client.setEncoding('utf8');
  console.log('Server: Client Connected');
  // clientInfo.push(client);
  // console.log(client);
  // writes string to client
  client.write('Server: Hello client!\n');
  // pipe will pipe what the client says to client
  // client.pipe(client);

  // reads what data comes from client
  client.on('data', (data) => {
    console.log(data.toString());
  });

  client.on('end', () => {
    console.log('Server: Client disconnected');
  });

  process.stdin.on('readable', () => {
    const data = process.stdin.read();

    if (data !== null) {
      client.write("Server: " + data.toString());
      // client.pipe(client);
    }
  });

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