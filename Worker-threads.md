# Worker threads (Parallel tasks)

> Works from 11 version of nodejs

### Links

* [How-to-work-with-worker-threads-in-nodejs](https://livecodestream.dev/post/how-to-work-with-worker-threads-in-nodejs/)
* [Nodejs multithreading](https://blog.logrocket.com/node-js-multithreading-worker-threads-why-they-matter/)

--- 

###### app.js
```js
const { Worker } = require('worker_threads')

// wrap the creating worker thread into Promise
// for convenience;
// "workerData" will be accessible in worker-file via "worker_threads" package
// it can be any type
function runService(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./worker.js', { workerData });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    })
  })
}

async function run() {
  const { hardCalculations } = require('./utils') 

  // ~ 10-12 sec
  console.time('no-threads')
  const results1 = await Promise.all([
    hardCalculations(400000),
    hardCalculations(50000050),
    hardCalculations(84000000),
  ])
  console.timeEnd('no-threads')

  // ~ 4-6 sec
  console.time('with-threads')
  const results2 = await Promise.all([
    runService({ fibNumb: 400000 }),
    runService({ fibNumb: 50000050 }),
    runService({ fibNumb: 84000000 }),
  ])
  console.timeEnd('with-threads')
}

run().catch(err => console.error(err))
```

###### worker.js

```js
const { workerData, parentPort } = require('worker_threads')

// import hardCalculation and use for worker thread
const { hardCalculations } = require('./utils')

// "parentPort.postMessage" - its kinda response to main-process;
// "workerData" - its param that was passed to worker_thread; 
parentPort.postMessage(hardCalculations(workerData.fibNumb))
```

###### utils.js

```js
function hardCalculations(n) {
  console.log('---------------', n)
  n = n * 1000
  let count = 0;
 
  if (n > 5000000000) n = 5000000000;
  for (let i = 0; i <= n; i++) {
    count += i;
  }
  return count
}

module.exports = {
  hardCalculations,
}
```
