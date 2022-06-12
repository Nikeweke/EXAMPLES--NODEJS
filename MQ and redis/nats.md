# Nats

### Install 

1. Download release from [github](https://github.com/nats-io/nats-server/releases), choose `amd64` version
2. Run and use :4222 port

> Enable monitoring: nats-server.exe -m 8222

### Example 

> npm i nats@latest -S

###### consumer.js

```js
const nats = require("nats");
const servers = [
  // {},
  // { servers: ["demo.nats.io:4442", "demo.nats.io:4222"] },
  // { servers: "demo.nats.io:4443" },
  { port: 4222 },
  // { servers: "localhost" },
];

main()
async function main() {
  try {
    const sc = nats.StringCodec();
    const nc = await nats.connect(servers[0])
    console.log(`connected to ${nc.getServer()}`);

    // on close handler
    nc.closed().then(() => {
      console.log('connection was closed')
    })

    // 1 Option to read message (non-blocking)
    // nc.subscribe('orderCreated', {
    //   callback: (err, msg) => {
    //     console.log(sc.decode(msg.data))
    //   },
    //   // max: 1
    // })

    // 2 Option to read messages (Blocking)
    const sub = nc.subscribe('orderCreated')
    // console.log(sub)
    for await (const m of sub) {
      const msg = sc.decode(m.data)
      console.log(msg)      
    }
  } catch(err) {
    console.log(err)
  }
}
```

###### publisher.js
```js
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
```