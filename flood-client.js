// jshint esversion:6
const net = require('net');
const PORT = process.env.PORT || 6969;

const client = new net.connect(PORT, () => {
  console.log(`Connected to server at port ${PORT}`);

  // |---- readable
  // v                 v---- writable
  process.stdin.pipe(client);

  // |---- readable
  // v         v---- writable
  client.pipe(process.stdout);
});

client.on('error', (err) => {
  throw err;
});

client.on('end', () => {
  console.log('Disconnected from the server');
});
