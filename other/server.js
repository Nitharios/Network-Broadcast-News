// jshint esversion:6
// telnet localhost 'port#'
const net = require('net');
const system = '[System]';
const admin = '[ADMIN]';
const alert = '[ALERT]';

const PORT = process.env.PORT || 6969;
// process.stdin.setEncoding('utf8');
// this is where client information will be
let clientInfo = [];
let user;

// once user has a username established, able to send messages to everyone
const broadcast = (sender, message) => clientInfo
  .filter(c => c !== sender)
  .forEach(c => {
    c.write(message.toString());
  });

const server = net.createServer((client) => { // client -> socket
  // when client connects, invoke this closure
  user = client.remotePort;

  console.log(`${alert}: ${user} has connected`);
  // register the client into clientInfo array
  clientInfo.push(client);

  client.username = null;
  // prompt for username;
  client.write(`${system}: What is your username?\n`);

  client.on('data', (data) => {
    // the first message should be the client's username
    if (client.username === null) {
      //set the username to data
      client.username = data.toString();
      client.write(`${system}: Welcome ${client.username}`);
    } else {
      // broadcast the message to all other clientInfo
      broadcast(client, data.toString());
    }
  });

  process.stdin.pipe( client );
});

server.on('error', (err) => {
  throw err;
});

server.listen(PORT, () => {
  console.log(`${system}: Server listening on port: ${PORT}`);
});
