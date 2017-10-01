// jshint esversion:6
const net = require('net');
const PORT = process.env.PORT || 6969;

const client = new net.connect(PORT, '10.0.1.161', () => {
  console.log(`Connected to server at port ${PORT}`);

  process.stdin.on('readable', () => {
    const data = process.stdin.read();
    if (data !== null && data.toString().trim() === '\\flood') {
      while (true) client.write('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?');
      // client.pipe(client);
    }
  });

  // // |---- readable
  // // v                 v---- writable
  // process.stdin.pipe(client);

  // // |---- readable
  // // v         v---- writable
  // client.pipe(process.stdout);
});

client.on('error', (err) => {
  throw err;
});

client.on('end', () => {
  console.log('Disconnected from the server');
});
