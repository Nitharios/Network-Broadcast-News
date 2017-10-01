// jshint esversion:6
// telnet localhost 'port#'
const net = require('net');
const system = '[System]';
const admin = 'ADMIN';
const alert = '[ALERT]';

const PORT = process.env.PORT || 6969;
// process.stdin.setEncoding('utf8');
// this is where client information will be
let clientInfo = [];
let user;

const server = net.createServer((client) => {
  client.setEncoding('utf8');
  // notifies the console that a user has connected
  console.log(`${alert}: User connected on port ${client.remotePort}`);
  
  // stores new client info

  // prompts user for login info
  client.write(`${system}: Enter your username\n`);
  
  // reads what data comes from client
  client.on('data', (data) => {
    console.log(`[${user}]: ${data.toString().trim()}`);

    if (!client.userName) {
      if (data.trim().toLowerCase().includes('admin') || 
        clientInfo.find(index => index.userName.toLowerCase() === data.trim().toLowerCase())) { 
        client.write(`${system}: Invalid username\n`);

      } else {
        client.userName = data.toString().trim();
        user = client.userName;
        client.write(`${system}: Welcome ${user}\n`);
        clientInfo.push(client);
      }
    //   client.write(`${system}: Enter your password\n`);

    // } else if (!client.password) {
    //   // stored in binary
    //   client.password = data;

      console.log(`numStored: ${clientInfo.length}`);
    
    } else sendToAll(`${client.userName}`, data);
  });

  // handles input from Server console
  process.stdin.on('readable', () => {
    const data = process.stdin.read();
    if (data !== null) {

      console.log(`[${admin}]:`, data.toString().trim());
      sendToAll(`${admin}`, data);
      // client.pipe(client);
    }
  });

  client.on('end', () => {
    console.log(`${alert}: ${user || client.remotePort} disconnected`);
    // sendToAll(alert, user + ' disconnected');
  });
});

server.on('error', (err) => {
  throw err;
});

server.listen(PORT, () => {
  console.log(`${system}: Server listening on port ${PORT}`);
});

/////// NON-SERVER SPECIFIC FUNCTIONS //////
function sendToAll(user, data) {
  clientInfo.forEach(function(clientData) {
    clientData.write(`[${user}]: ${data.toString().trim()}\n`);
  });
}

/*const server = net.createServer((client) => { // client -> socket
  // when client connects, invoke this closure
  console.log('client has connected');
  // register the client into clients array
  clients.push(client);

  client.username = null;
  // prompt for username;
  client.write('What is your username?\n');

  client.on('data', (data) => {
    // the first message should be the client's username
    if (client.username === null) {
      //set the username to data
      client.username = data.toString();
      client.write(`Welcome ${client.username}`);
    } else {
      // broadcast the message to all other clients
      broadcast(client, data.toString());
    }
  });
});*/