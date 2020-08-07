# JS - OOP (ES5 vs ES6 classes)


Содержание
* ES5 vs ES6 отличие классов
* Создание класса
* Наследование
* Private and public fields
* Вызов родительского конструктора

--- 

### ES5 vs ES6 classes difference
- class keyword
- constructor function syntax
- getter/setter syntax
- extends keyword
- super keyword
- static keyword

### Создание класса (`class`, `constructor`)
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

### Наследование (`class`, `extends`, `super`) 
###### ES5 
```js
function Animal(name) {
  this.name = name
}
Animal.prototype.voice = function () {
  console.log('Hello from - ', this.name)
}

function Dog(color) {
  // Call constructor of superclass to initialize superclass-derived members.
  Animal.call(this, 'dog') 
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
    super('dog')
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
