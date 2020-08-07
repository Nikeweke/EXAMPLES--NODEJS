# JS - OOP (ES6 vs ES5 classes)


Содержание
* ES5 vs ES6 classes difference
* Создание класса
* Private and public fields
* Наследование 
* Вызов родительского конструктора

--- 

### ES5 vs ES6 classes difference
- class keyword
- constructor function syntax
- getter/setter syntax
- extends keyword
- super keyword
- static keyword

### Создание класса
```js
// ES5 (function-constructor)
function User(name) {
  this.name = name || ''
}
```

```js
// ES6 class
class User {
  constructor(name) {
    this.name = name || ''
  }
}
```

### Наследование 
```js
// ES5 
function Animal () {
  this.hello = function() {
    console.log('Hello from animal')
  }
}

Animal.prototype.hello2 = function () {
    console.log('Hello 2 from animal')
}

function Dog () {
// Dog extends Animal that created inside
  Animal.call(this)
}
// Dog extends Animal that created on prototype
Dog.prototype = Object.create(Animal.prototype)

let anim = new Animal()
let dog = new Dog()

anim.hello()
dog.hello()
dog.hello2()
```

```js
// ES6 
class Animal  {
  hello () {
    console.log('Hello from animal')
  }
}

Animal.prototype.hello2 = function () {
    console.log('Hello 2 from animal')
}

// Dog extends Animal that created inside
class Dog extends Animal {}

let anim = new Animal()
let dog = new Dog()

anim.hello()
dog.hello()
dog.hello2()
```
