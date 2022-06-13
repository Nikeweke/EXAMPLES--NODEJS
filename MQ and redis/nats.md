# Nats

### Install 

1. Download release from [github](https://github.com/nats-io/nats-server/releases), choose `amd64` version
2. `npm i nats@latest -S`
2. Run nats.exe (by default 4222 port)

> Enable monitoring: nats-server.exe -m 8222

### Pub/Sub (Simple)

###### consumer.js

```js
const nats = require("nats");

main()
async function main() {
  try {
    const sc = nats.StringCodec();
    const nc = await nats.connect() // by default to localhost:4222 or pass object "{ port: 4222 }"
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
<br />

### Queue (JetStream) *(beta)*

```sh
# enable jetstream (queues) ()
> nats-server.exe -js 
```

> [More about jetstream](https://docs.nats.io/using-nats/developer/develop_jetstream)

###### 1. create stream and push messages into queue (stream)

```js

const nats = require('nats')
const { RetentionPolicy, StorageType } = nats

main()
async function main() {
  const nc = await nats.connect()
  const codec = nats.StringCodec()
  const jsm = await nc.jetstreamManager();

  // list all the streams, the `next()` function
  // retrieves a paged result.
  const streams = await jsm.streams.list().next();
  streams.forEach((si) => {
    console.log(si);
  });

  // add a stream
  const stream = "mystream";
  const subjectWildcard = `mysubj.*`
  const subj = `mysubj.a`;
  await jsm.streams.add({ 
    name: stream, 
    subjects: [subjectWildcard],

    // https://docs.nats.io/using-nats/developer/develop_jetstream/model_deep_dive
    retention: RetentionPolicy.Workqueue,
    // * Limits (default) - all messages exist in stream(queue) even if was ack
    // * Interest - same as Limits, but if consumers absent, all messages removing
    // * Workqueue - works as queue, when you ack message it is pulling out from queue(stream)


    storage: StorageType.Memory, // Or file
  });

  // publish a reg nats message directly to the stream
  // for (let i = 0; i < 100; i++) {
  //   nc.publish(subj, codec.encode("Hello" + i));
  // }

  // find a stream that stores a specific subject:
  const name = await jsm.streams.find(subj);
  // console.log(name)

  // retrieve info about the stream by its name
  const si = await jsm.streams.info(name);
  console.log(si)
  // state.messages must have "100"

  // Read from queue but without message deletion (not a consumer)
  // for (let i = 0; i < 5; i++) {
  //   await new Promise((res) => setTimeout(res, 1000))
  //   const sm = await jsm.streams.getMessage(stream, { seq: 1 });
  //   console.log()
  //   console.log(sm.seq);
  //   console.log(codec.decode(sm.data))
  //   console.log('Messages =', si.state.messages)
  // }


  // update a stream configuration
  // si.config.subjects?.push("a.b");
  // await jsm.streams.update(si.config);

  // delete the 5th message in the stream, securely erasing it
  // await jsm.streams.deleteMessage(stream, 5);

  // purge all messages in the stream, the stream itself remains.
  // await jsm.streams.purge(stream);

  // purge all messages with a specific subject (filter can be a wildcard)
  // await jsm.streams.purge(stream, { filter: "a.b" });

  // purge messages with a specific subject keeping some messages
  // await jsm.streams.purge(stream, { filter: "a.c", keep: 5 });

  // purge all messages with upto (not including seq)
  // await jsm.streams.purge(stream, { seq: 90 });

  // purge all messages with upto sequence that have a matching subject
  // await jsm.streams.purge(stream, { filter: "a.d", seq: 100 });
}
```

###### 2. Add durable consumer for use ack

```js
/*
  * adding stream(queue) with wildcard subject(topic)
  * push into queue
  * get messages without deletion
*/
const nats = require('nats')
const { AckPolicy } = nats

main()
async function main() {
  const nc = await nats.connect()
  const jsm = await nc.jetstreamManager();

  // list all the streams, the `next()` function
  // retrieves a paged result.
  // const streams = await jsm.streams.list().next();
  // streams.forEach((si) => {
  //   console.log(si);
  // });

  // specifying a stream name
  const stream = "mystream";

  // list all consumers for a stream:
  const consumers = await jsm.consumers.list(stream).next();
  consumers.forEach((ci) => {
    console.log(ci);
  });

  // add a new durable pull consumer
  // https://docs.nats.io/nats-concepts/jetstream/consumers#deliverpolicy-optstartseq-optstarttime
  const durableName = 'me'
  await jsm.consumers.add(stream, {
    durable_name: durableName,
    ack_policy: AckPolicy.Explicit,
  });

  // retrieve a consumer's configuration
  const ci = await jsm.consumers.info(stream, "me");
  console.log(ci);

  // delete a particular consumer
  // await jsm.consumers.delete(stream, "me");
}
```

###### 3. Pull the message from queue

```js
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
```
