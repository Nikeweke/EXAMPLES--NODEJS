# Clusters

### Into
**Cluster** - это built-in модуль предоставляет способ создания дочерних процессов, 
которые выполняются одновременно и совместно используют один и тот же порт сервера.

### Настройка мастер-кластера и `fork` от него
```js
const cluster = require('cluster');

// Настраиваем кластер, от которого потом запускаем процесс "fork"
cluster.setupMaster({
  exec: __dirname + '/worker.js',
  args: ['--use', 'https'],
})

// Ответляемся от настроенного кластера (создание 2 процессов)
cluster.fork() 
cluster.fork() 

// Настраиваем кластер, на другой процесс
cluster.setupMaster({
  exec: __dirname + '/server.js',
  silent: false  // запрещает вывод всех исходящих из процесса console.log() и т.д.
})

cluster.fork() 
```

### Запуск многих процессов на одном порту 
```js
if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);
}
```
