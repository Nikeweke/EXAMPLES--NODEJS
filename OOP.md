# JS - OOP (ES5 vs ES6 classes)


Содержание
* ES5 vs ES6 отличие классов
* Создание класса
* Наследование
* static, getter, setter

--- 

### ES5 vs ES6 отличие классов
- class keyword
- constructor function syntax
- extends keyword
- super keyword
- static keyword
- getter/setter syntax

### Создание класса - `class`, `constructor`
###### ES5 (function-constructor) 
```js
function User(name) {
  this.name = name || ''
}
```

###### ES6 
```js
// ES6 class
class User {
  constructor(name) {
    this.name = name || ''
  }
}
```
<br>

### Наследование - `class`, `extends`, `super` 
###### ES5 
```js
function Animal(name) {
  this.name = name
}
Animal.prototype.voice = function () {
  console.log('Hello from - ', this.name)
}

function Dog(color) {
  Animal.call(this, 'dog') // Вызов родительского конструктора 
  this.color = color
}
// Dog extends Animal
Dog.prototype = Object.create(Animal.prototype) 
Dog.prototype.constructor = Dog;
// Only Dog-class method
Dog.prototype.getColor = function() {
  console.log('Dog is ' + this.color +  ' color')
}

let animal = new Animal('wolf')
let dog = new Dog('dog', 'red')

animal.voice()
dog.voice()
dog.getColor()
```

###### ES6
```js
class Animal  {
  constructor(name) {
    this.name = name
  }
  voice() {
    console.log('Hello from - ', this.name)
  }
}

class Dog extends Animal {
  constructor(color) {
    super('dog') // Вызов родительского конструктора
    this.color = color
  }
  getColor() {
    console.log('Dog is ' + this.color +  ' color')
  }
}


let animal = new Animal('wolf')
let dog = new Dog('red')

animal.voice()
dog.voice()
dog.getColor()
```
<br>

### `static`, `getter`, `setter`
###### ES5
```js
function User() {}
 // static method
User.someInfo = function() {
   console.log('i am static method')
 }
```

###### ES6
```js
class User {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  static info() {
    console.log('i am static method')
  }

  get ageWithName() {
    return `${this.name} (${this.age})`
  }

  set ageAndName({ age, name }) {
    this.age = age
    this.name = name
  }
}

const user = new User('Axelrod', 25)
console.log(user.ageWithName)

user.ageAndName = { age: 23, name: 'Baker'}
console.log(user.ageWithName)

User.info()
```
