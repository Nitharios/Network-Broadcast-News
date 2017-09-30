// jshint esversion:6
// telnet localhost 'port#'
const net = require('net');
const system = '[System]: ';
const admin = '[ADMIN]: ';
const alert = '[ALERT]: ';
// process.stdin.setEncoding('utf8');
// this is where client information will be
let clientInfo = [];

const server = net.createServer((client) => {
  let userName = client.remoteAddress + ': ';
  client.setEncoding('utf8');
  console.log(system + 'USER Connected');
  // clientInfo.push(client);
  // writes string to client
  client.write(system + 'Welcome user!\n');
  // client.write(system + 'Please enter your name and password: ');
  // pipe will pipe what the client says to client
  // console.log(client);
  // client.pipe(client);

  // reads what data comes from client
  client.on('data', (data) => {
    console.log(userName + data);
    client.write(userName + data);
  });

  client.on('end', () => {
    console.log(system + 'USER disconnected');
  });

  process.stdin.on('readable', () => {
    const data = process.stdin.read();

    if (data !== null) {
      client.write(admin + data.toString());
      // client.pipe(client);
    }
  });

});

server.on('error', (err) => {
  throw err;
});

server.listen(6969, '0.0.0.0', () => {
  console.log(system + 'Server online');
});

  // server.on('data', (data) => {
  //   console.log(data.toString());
  //   server.end();
  // });