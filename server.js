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
  let user = '[' + client.remoteAddress + ']' + ': ';
  client.setEncoding('utf8');
  console.log(user + 'Connected');
  
  // need code that asks user for userName and password

  clientInfo.push(client);
  // writes string to client
  client.write(system + 'Welcome user!');
  // client.write(system + 'Please enter your name and password: ');
  // pipe will pipe what the client says to client
  // console.log(client);
  // client.pipe(client);

  // reads what data comes from client
  client.on('data', (data) => {
    console.log(user + data);
    sendToAll(user, data);

    // client.write(userName + data);
    // server.emit('Hello');
  });

  client.on('end', () => {
    console.log(system + 'USER disconnected');
  });

  process.stdin.on('readable', () => {
    const data = process.stdin.read();
    if (data !== null) {
      console.log(admin, data.toString());
      sendToAll(admin, data);
      // client.write(admin + data.toString());
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

/////// NON-SERVER SPECIFIC FUNCTIONS //////
function sendToAll(user, data) {
  clientInfo.forEach(function(clientData) {
    clientData.write(user + data);
  });
}
  // server.on('data', (data) => {
  //   console.log(data.toString());
  //   server.end();
  // });