const nats = require("nats");

main()
async function main() {
  try {
    const sc = nats.StringCodec()
    const nc = await nats.connect({ port: 4222 })
    console.log(`connected to ${nc.getServer()}`);

    // on close handler
    nc.closed().then(() => {
      console.log('connection was closed')
    })

    setInterval(() => {
      console.log('sent')
      const messageToSent = JSON.stringify({
        hello: 'there',
      })
      nc.publish('orderCreated', sc.encode(messageToSent))
    }, 1000)

  } catch(err) {
    console.log(err)
  }
}
