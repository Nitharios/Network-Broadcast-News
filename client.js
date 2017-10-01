// jshint esversion:6
const net = require('net');
const PORT = process.env.PORT || 6969;

const client = new net.Socket();
client.connect(PORT, () => {
  console.log(`connected to client at port ${PORT}`);

  // |---- readable
  // v                 v---- writable
  process.stdin.pipe( client );

  // |---- readable
  // v         v---- writable
  client.pipe( process.stdout );
});
