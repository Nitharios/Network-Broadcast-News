// jshint esversion:6
const net = require('net');
const PORT = process.env.PORT || 6969;

const client = new net.connect(PORT, () => {
  console.log('Connected to the server!');

  // handles what is input to the console
  process.stdin.on('readable', () => {
    const data = process.stdin.read();
    
    if (data !== null) {
      client.write(data);
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
  console.log('Disconnected from the server');
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

/*
const server = new net.Socket();
server.connect(PORT, () => {
  console.log(`connected to server at port ${PORT}`);

  // |---- readable
  // v                 v---- writable
  process.stdin.pipe( server );

  // |---- readable
  // v         v---- writable
  server.pipe( process.stdout );
});
*/