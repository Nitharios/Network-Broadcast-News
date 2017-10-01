// jshint esversion:6
// telnet localhost 'port#'
const net = require('net');
const system = '[System]: ';
const admin = '[ADMIN]: ';
const alert = '[ALERT]: ';

const PORT = process.env.PORT || 6969;
// process.stdin.setEncoding('utf8');
// this is where client information will be
let clientInfo = [];
let user;

const server = net.createServer((client) => {
  user = client.remotePort;
  let userTag = '[' + user + ']' + ': ';
  // notifies the console that a user has connected
  console.log(alert + user + ' connected');

  client.write(system + 'Welcome ' + user + '!\n');
  // prompts user for login info
  if (!client.userName) client.write(system + 'Enter your userName');

  // reads what data comes from client
  client.on('data', (data) => {
    console.log(userTag + data.slice(0, data.length-1));

    if (!client.userName) {
      client.userName = data.slice(0, data.length-1);
      user = data.slice(0, data.length-1);
      userTag = '[' + user + ']' + ': ';
      client.write(system + 'Enter your password');

    } else if (!client.password) {
      client.password = data;
      clientInfo.push(client);
      console.log('numStored: ' + clientInfo.length);
    
    } else sendToAll(userTag, data.slice(0, data.length-1));
  });

  // handles input from Server console
  process.stdin.on('readable', () => {
    const data = process.stdin.read();
    if (data !== null) {
      console.log(admin, data.slice(0, data.length-1).toString());
      sendToAll(admin, data.slice(0, data.length-1));
      // client.pipe(client);
    }
  });

  client.on('end', () => {
    console.log(alert + user + ' disconnected');
    // sendToAll(alert, user + ' disconnected');
  });
});

server.on('error', (err) => {
  throw err;
});

server.listen(PORT, () => {
  console.log(system + 'Server listening on port: $`{$PORT}`');
});

/////// NON-SERVER SPECIFIC FUNCTIONS //////
function sendToAll(user, data) {
  clientInfo.forEach(function(clientData) {
    clientData.write(user + data);
  });
}