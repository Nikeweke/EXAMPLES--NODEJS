// start nats with: nats-server.exe -js 

const nats = require('nats')

main()
async function main() {
  const nc = await nats.connect()
  const codec = nats.StringCodec()
  const js = nc.jetstream();

  const stream = 'mystream'
  const durableName = 'me'

  let msg = await js.pull(stream, durableName);
  console.log(codec.decode(msg.data))
  msg.ack();
}
