# Promises Advanced

#### Links
* [9 полезных советов по Promise.resolve и Promise.reject](https://proglib.io/p/9-js-promise-advice/)
* [CSS tricks](https://css-tricks.com/why-using-reduce-to-sequentially-resolve-promises-works/)
* [HeavyMetalCoder](https://www.heavymetalcoder.com/make-array-foreach-synchronous-even-with-an-asynchronous-body/)

#### Содержание 
* Control promises flow with returning `Promise.resolve` & `Promise.reject`
* Dont make nested "then" 
* Make delay to continue
* Insert a few records with check of previous
* Make a chain with promises (waterfall)
* `Promise.all` vs `Promise.allSettled`

---

### Control promises flow with returning `Promise.resolve` & `Promise.reject`
```js
new Promise((res, rej) => { rej('here') })

.catch(err => {
  if (err.statusCode === 400) {
    return Promise.reject(err)
  }
  return Promise.resolve(err)
})

.then(r => console.log('then'))

.catch(err => console.log('catch'));
```

### Dont make nested "then"
```js
// Wrong
new Promise((res, rej) => { res() })
.then(() => {
 somePromise()
   .then((data) => console.log(data)) 
})
.then((data) => {
 console.log(data) // "Hello"
})
.catch((err) => console.log('Error occured'))
```

```js
// Right
new Promise((res, rej) => { res() })
.then(() => somePromise())
.then((data) => {
 console.log(data) // "somePromise" answer
})
.catch((err) => console.log('Error occured'))
```

### Make delay to continue
```js
new Promise((r, j) => setTimeout(r, 5000))
.then(...)

// another option
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
delay(3000).then(() => alert('runs after 3 seconds'));
```

### Insert a few records with check of previous
We want to insert a few records, but want make it sequntially and check if previous inserted well, kinda transaction.
```js
function methodThatReturnsAPromise(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Processing ${id}`);
      resolve(id);
    }, 1000*id);
  });
}

let result = [2,1,3].reduce( (accumulatorPromise, nextID) => {
  return accumulatorPromise.then((id) => {
    // here we can do check if insertion was correct
    // first will be undefined cuz initialValue is Promise.resolve()
    console.log('Id Of inserted item = ', id)

    return methodThatReturnsAPromise(nextID)
  });
}, Promise.resolve());

result.then(e => {
  console.log("Resolution is complete! Let's party.")
});

```


### Make a chain with promises (waterfall)
```js
myPromise(index, sec) {
  return new Promise((res) => {
    setTimeout(() => { res(`DONE ${index}#`) }, sec)
  }).then((res) => {
    console.log(res)
  })
}  
```

```js
// Manually created chain 
Promise.resolve()
   .then(() => myPromise(1, 3000))
   .then(() => myPromise(2, 3000))
   .then(() => myPromise(3, 3000))
```

```js
// Equal to above, created with "reduce"       
const array = [1, 2, 3]
array.reduce(
  // callback
  (accumulator, currentValue, index) => accumulator.then(() => myPromise(index, 3000)), 

  // initValue
  Promise.resolve()
);
```

```js
// The most advanced way is wrapp all promises in func then check em all
const promises = [
  () => myPromise(1, 3000),
  () => myPromise(2, 3000),
  () => myPromise(3, 3000),
] 

   
const promisesResult = promises.reduce(
  // callback
  (accumulator, currentValue, index) => {
    return accumulator.then(
    	() => currentValue().then((res) => { console.log(res); })
    )
  }, 

  // initValue
  Promise.resolve()
);

promisesResult.then(() => console.log("All done"))
.catch((err) => {  console.log('Error -', log) })
```

### `Promise.all` vs `Promise.allSettled`  

```js
const promises = [
	Promise.resolve(1),
  Promise.resolve(2),
  Promise.reject('error'),
  Promise.resolve(-100)
];
```

###### Promise.all() 
```js
(async function() {
  try {
    await Promise.all(promises).then(
      (results) => console.log(results)
    )
  } catch(err) {
    console.log('ERROR:', err) // will get here 
  }
})()
```

###### Promise.allSettled()
```js
(async function() {
  try {
    await Promise.allSettled(promises).then(
      (results) => console.log(results)
    )
  } catch(err) {
		console.log('ERROR:', err)
	}
})()

// Output
/* [{ 
  status: "fulfilled",
  value: 1
}, {
  status: "fulfilled",
  value: 2
}, {
  reason: "error",
  status: "rejected"
}, {
  status: "fulfilled",
  value: -100
}] */

```