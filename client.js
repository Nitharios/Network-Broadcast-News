// jshint esversion:6
const net = require('net');

const client = new net.connect(6969, '10.0.1.161', () => {
  console.log('Connected to server!');
  client.write('Client: Hello server!');


  // handles what is input to the console
  process.stdin.on('readable', () => {
    const data = process.stdin.read();
    
    if (data !== null) {
      client.write("Client: " + data.toString());
    }
  });

});

  // handles data from server
  client.on('data', (data) => {
    console.log(data.toString());
  });

client.on('error', (err) => {
  throw err;
});

client.on('end', () => {
  console.log('Client: Disconnected from server');
});

// client.listen(6969, '0.0.0.0', () => {
//   console.log('Connected to server');
// });

// client.on('data', (data) => {
//   console.log(data.toString());
//   // client.end();
// });

// client.listen(6969, '0.0.0.0');
// client.connect(6969, '0.0.0.0');