# Redis events - SET, DEL

```js
const redis = require("redis");

const port = '6379'
const client = redis.createClient(port,'127.0.0.1');

// if doesnt catch events, paste into redis-cli: 
// redis-cli> config set notify-keyspace-events KEA
client.config('set','notify-keyspace-events','KEA');
 

var EVENT_SET = '__keyevent@0__:set';
var EVENT_DEL = '__keyevent@0__:del';

client.on('message', function(channel, key) {
  switch (channel) {
  case EVENT_SET:
    console.log('Key "' + key + '" set!');
    break;
  case EVENT_DEL:
    console.log('Key "' + key + '" deleted!');
    break;
  }
});

client.subscribe(EVENT_SET, EVENT_DEL);
```
