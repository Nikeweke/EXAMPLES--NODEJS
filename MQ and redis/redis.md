# Redis

* Quick start
* First connection 
* Set and Get key-value

--- 

### Quick start
* Install redis (Windows) - https://github.com/rgl/redis/downloads 

* Start redis server 
```
./redis_server
```

* Check server
```sh
# in the folder of redis
./redis_cli

redis> set foo bar
OK
redis> get foor
"bar" 
```

### Redis CLI Commands 
[All Commands](https://redis.io/commands#)
* `set [key] [value]` - установить ключ и значение для него
* `get [key]` - получить значение по ключу
* `setnx` - установить значение ключу, только если его не существует (`SETNX mykey "World"`)
* `setex` - установить значение ключу и дата окончания срока `SET mykey value EXPIRE mykey seconds`
* `getset` - установить новое значение ключу, и вернуть старое значение

### First connection 
```sh
npm i redis -S
```

```js
const redis  = require('redis')

// By default redis running on 127.0.0.1:6379
const client = redis.createClient() // this creates a new client
// redis.createClient(port, host) // for custom port 

// redis events
client
  .on('connect', () => {
    console.log('Redis client connected')
  })
  .on('error', (err) => {
    console.log('Some error occured\n', err)
  })
```

### Set and Get key-value
```js
// redis.print - means "out asnwer from redis"
client.set('my test key', 'my test value', redis.print);
client.get('my test key', (error, result) => {
  if (error) {
    console.log(error);
    throw error;
  }
  console.log('GET result ->' + result);
})
```
