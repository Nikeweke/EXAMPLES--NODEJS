# JS - OOP 
#### ES6 vs Prototypes

Содержание
* ES6 Classes features
* Создание класса
* Private and public fields
* Наследование 
* Вызов родительского конструктора

--- 


### ES6 Classes features
- class keyword
- getter/setter syntax
- constructor function syntax
- extends keyword
- super keyword
- static keyword



### Создание класса
```js
// ES5 
function Animal (name, size) {
  // нет явного конструктора,
  // используем переданные параметры функции
  
  // поля (свойства)
  this.name = name || ''
  this.size = size || ''
  
  // метод (так больше памяти выделяеться)
  this.sayHello = function () {
    console.log(`${this.name} (${this.size}) says hello`)
  }
}

// метод (так меньше памяти выделяеться)
Animal.prototype.sayHello2 = function() {
  console.log('i am here', this.name)
}

const anim = new Animal('cow', 'big')
anim.sayHello()
anim.sayHello2()

```

```js
// ES6 class
class Animal {
  constructor (name, size) {
	// поля (свойства)
	this.name = name || ''
    this.size = size || ''
  }
  
  // методы
  sayHello() {
    console.log(`${this.name} (${this.size}) says hello`)
  }
}

const anim = new Animal('cow', 'big')
anim.sayHello()
```

### Private and public fields
```js
// ES5 - Function-class
function Animal () {
  var private_var = 'i am private here'
  
  // using closure here
  this.setPrivateVar = function(value) { private_var = value }
  this.getPrivateVar = function() { return private_var }
}
```

```js
// ES6 class
class Animal {
   constructor() {
    var private_var = 'i am private here'
    // using closure here
    this.setPrivateVar = function(value) { private_var = value }
    this.getPrivateVar = function() { return private_var }
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

### Вызов родительского конструктора
```js
// Function-class
function Cat () {
  Animal.call(this) 
}
```

```js
// ES6 class
class Cat extends Animal {
  constructor() {
    super()
  }
}
```
