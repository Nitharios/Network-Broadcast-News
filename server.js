// jshint esversion:6
// telnet localhost 'port#'
const net = require('net');
const system = '[System]: ';
const admin = '[ADMIN]: ';
const alert = '[ALERT]: ';
// process.stdin.setEncoding('utf8');
// this is where client information will be
let clientInfo = [];
let user;

const server = net.createServer((client) => {
  user = client.remotePort;
  let userTag = '[' + user + ']' + ': ';

  console.log(system + user + ' connected');

  // need code that asks user for userName and password
  client.write(system + 'Welcome ' + user + '!\n');
  // prompts user for login info
  if (!client.userName) client.write(system + 'Enter your userName');

  // reads what data comes from client
  client.on('data', (data) => {
    console.log(userTag + data);

    if (!client.userName) {
      client.userName = data;
      user = data;
      userTag = '[' + user + ']' + ': ';
      client.write(system + 'Enter your password');
      // user = client.userName.toString();

    } else if (!client.password) {
      client.password = data;
      clientInfo.push(client);
      console.log(client.userName.toString());
      console.log(client.password.toString());
      console.log(user.toString());
      console.log('numStored: ' + clientInfo.length);
    
    } else sendToAll(userTag, data);
  });

  // handles input from Server console
  process.stdin.on('readable', () => {
    const data = process.stdin.read();
    if (data !== null) {
      console.log(admin, data.toString());
      sendToAll(admin, data);
      // client.write(admin + data.toString());
      // client.pipe(client);
    }
  });

  // console.log(clientInfo);

  client.on('end', () => {
    console.log(system + user + ' disconnected');
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