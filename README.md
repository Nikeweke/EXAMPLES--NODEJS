# JS / NODE

#### Содержание 

* Quick start
* Bcrypt, node-sass install faild solution
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


### Bcrypt, node-sass install fail solution

First of all python 2-version must be installed

###### 1 option 

> source: https://stackoverflow.com/questions/46515077/unable-to-install-node-sass-in-my-project

```sh
npm uninstall node-sass
rm package-lock.json
npm cache clean --force
npm update 
npm i
```

###### 2 option
* change `bcrypt` to `bcryptjs` (its dep without need to build, but slower)
* change `node-sass` to `sass(dart-sass)` (its dep without need to build, but slower)

### Вопросы и ответы, решение проблем
* В функциях которые `async` не ловяться ошибки, как их словить ?
* Как проверить свойство обьекта на пустоту или `undefined`?
* Упрощение тернарного (?:) оператора.
* [Как сделать JS более производительным?](https://medium.com/devschacht/3-tips-about-javascript-597c33a219d6)
* Не всегда `undefined` это не обозначеное что-то. Может быть подмена "undefined":

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

**2)** Как проверить свойство обьекта на пустоту или `undefined`?
```js
// if object === 'undefined', undefined
// else it will be 'number'
if(typeof from.date.year === 'number'){   
  console.log('Here')
} else{
  console.log('ehhh')
}
```

**3)** Упрощение тернарного (?:) оператора.
```
// Тернарный оператор
let employeeName = (employee.Name != null ? employee.Name : "Unknown"); 

// Упрощенный стиль (php analog: $var ?? null)
var employeeName = employee.Name || "Unknown"; 
```

**4)** Как сделать JS более производительным?
> https://medium.com/devschacht/3-tips-about-javascript-597c33a219d6

**5)** Не всегда `undefined` это не обозначеное что-то. Может быть подмена "undefined":
```js
const undefined = 'asd'
let ss = undefined

// Как нам проверить что переменная действительно "undefined"?
console.log(ss === undefined)  // true !! - undefined стала строкой, созданой выше
console.log(ss === void 0)  // false - "void 0" вернет действительно undefined, который нужен для проверки
```
