# Promises `Advanced` using + `reduce`

array.reduce(callback[, initialValue])
* callback - Функция, выполняющаяся для каждого элемента массива, принимает четыре аргумента:
   + accumulator - Аккумулятор, аккумулирующий значение, которое возвращает функция callback после посещения очередного элемента, либо значение initialValue, если оно предоставлено (смотрите пояснения ниже).
   + currentValue - Текущий обрабатываемый элемент массива.
   + index [Необязательный] - Индекс текущего обрабатываемого элемента массива.
   + array [Необязательный] - Массив, для которого была вызвана функция reduce



### Insert a few records with check of previous
We want to insert a few records, but want make it sequntially and check if previos inserted well
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
