# NodeJs
#### Туториал - https://www.youtube.com/watch?v=U57kU311-nE&index=9&list=PL4cUxeGkcC9gcy9lrvMJ75z9maRw4byYp
#### Содержание 

* Quick start
* Top of Node Frameworks 
* Вопросы и ответы, решение пробелем

---

### Quick start
Установить NodeJS с официального сайта
```js 
// app.js
console.log('Hello world')
```
```bash
node app
```

### Top of Node frameworks:
* Meteor.js - 38.400 stars
* Express.js - 34.000 stars
* Sails.js - 17.800 stars
* Koa.js - 17.700 stars
* Keystone.js - 11.100 stars

### Вопросы и ответы, решение пробелем
**1)** В функциях которые `async` не ловяться ошибки, как их словить ? ([source](https://medium.freecodecamp.org/here-are-examples-of-everything-new-in-ecmascript-2016-2017-and-2018-d52fa3b5a70e))
```
//Option 1 - Use try catch within the function
async function doubleAndAdd(a, b) {
 try {
  a = await doubleAfter1Sec(a);
  b = await doubleAfter1Sec(b);
 } catch (e) {
  return NaN; //return something
 }

return a + b;
}
//🚀Usage:
doubleAndAdd('one', 2).then(console.log); // NaN
doubleAndAdd(1, 2).then(console.log); // 6

function doubleAfter1Sec(param) {
 return new Promise((resolve, reject) => {
  setTimeout(function() {
   let val = param * 2;
   isNaN(val) ? reject(NaN) : resolve(val);
  }, 1000);
 });
}
```

