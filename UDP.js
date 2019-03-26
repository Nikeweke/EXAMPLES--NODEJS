/**
*  Sending messages via UDP (User diagram protocol)
*
*/
const ADDRESS = 8001

const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

// server listening 0.0.0.0:41234
server.bind(ADDRESS);


setTimeout(() => {
  const message = Buffer.from('Some bytes');
  const client = dgram.createSocket('udp4');
  
  client.send(message, ADDRESS, 'localhost', (err) => {
    client.close();
    console.log('Sent message')
  });
    
}, 2000);
