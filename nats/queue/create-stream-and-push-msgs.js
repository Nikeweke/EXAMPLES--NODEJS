// start nats with: nats-server.exe -js 

/*
  * adding stream(queue) with wildcard subject(topic)
  * push into queue
  * get messages without deletion
*/
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
    // * Workqueue - works as queue, when you ack message is pulling out from stream(queue)


    storage: StorageType.Memory, 
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

  // update a stream configuration
  // si.config.subjects?.push("a.b");
  // await jsm.streams.update(si.config);

  // get a particular stored message in the stream by sequence
  // this is not associated with a consumer


  // for (let i = 0; i < 5; i++) {
  //   await new Promise((res) => setTimeout(res, 1000))
  //   const sm = await jsm.streams.getMessage(stream, { seq: 1 });
  //   console.log()
  //   console.log(sm.seq);
  //   console.log(codec.decode(sm.data))
  //   console.log('Messages =', si.state.messages)
  // }


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


  // const js = nc.jetstream();
  // let msg = await js.pull(stream, durableName);
  // msg.ack();

}
