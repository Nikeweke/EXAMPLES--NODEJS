// start nats with: nats-server.exe -js 

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

  // add a stream
  const stream = "mystream";

  // list all consumers for a stream:
  const consumers = await jsm.consumers.list(stream).next();
  consumers.forEach((ci) => {
    console.log(ci);
  });

  // add a new durable pull consumer
  // 
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
