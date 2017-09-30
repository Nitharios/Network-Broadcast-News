// jshint esversion:6
const net = require('net');

const client = new net.connect(6969, '0.0.0.0', () => {
  console.log('Connected to server!');
  client.write('Client: Hello server!');

  process.stdin.on('readable', () => {
    const chunk = process.stdin.read();
    
    if (chunk !== null) {
      // console.log(chunk.toString());
      client.write(chunk.toString());
    }
  });
});

// client.on('data', (data) => {
//   console.log(data.toString());
//   // client.end();
// });

client.on('error', (err) => {
  throw err;
});

client.on('end', () => {
  console.log('Client: Disconnected from server');
});

// client.listen(6969, '0.0.0.0');
// client.connect(6969, '0.0.0.0');