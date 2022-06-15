# Typescript 

* [Init project](https://github.com/Nikeweke/EXAMPLES--NODEJS/blob/master/Typescript.md#init-project)
* [Type vs interface](https://github.com/Nikeweke/EXAMPLES--NODEJS/blob/master/Typescript.md#type-vs-interface)
* [Class](https://github.com/Nikeweke/EXAMPLES--NODEJS/blob/master/Typescript.md#class)
* [Interface](https://github.com/Nikeweke/EXAMPLES--NODEJS/blob/master/Typescript.md#interface)
* [Abstract class](https://github.com/Nikeweke/EXAMPLES--NODEJS/blob/master/Typescript.md#abstract-class)
* [Enums](https://github.com/Nikeweke/EXAMPLES--NODEJS/blob/master/Typescript.md#enums)
* [Types](https://github.com/Nikeweke/EXAMPLES--NODEJS/blob/master/Typescript.md#types)
* [Generics vs Any](https://github.com/Nikeweke/EXAMPLES--NODEJS/blob/master/Typescript.md#generics-vs-any)
* [Mixin](https://github.com/Nikeweke/EXAMPLES--NODEJS/blob/master/Typescript.md#ts-to-js-compile-result)


---


### Init project

###### deps 
```sh
npm init -y

# OR Locally install in project 
npm install -D typescript ts-node

# OR Globally install ts
npm install -g typescript ts-node
```

###### scripts for package.json
```js
"init-tsconfig": "tsc --init"
"build": "tsc", // build using tsconfig.json
"dev": "ts-node ./src/app.ts", // run with ts-node watcher

// in tsconfig.json you can specify src(rootDir), output(outDir) folder, etc.
```

###### tsc commands
```sh
# init tsconfig.json
tsc --init

# run ts code with tsconfig.json
tsc 

# compile app with tsconfig.json setup in js
tsc app.ts

# compile app without tsconfig.json setup in js
tsc app.ts -w

# enable experimental decorators in js
tsc app.ts -t ES5 --experimentalDecorators
```
<br />

### Types vs Interface vs Class

* Interface - use for contracts, type-checking, common data type declaration
* Types - are the same to Interface, but Type can't be modified after initilization
* Class - use when you need instance

###### Extending interface and type

```ts 
// extending interface 
interface Animal {
  name: string
}
interface Bear extends Animal {
  honey: boolean
}

const bear = getBear() 
bear.name
bear.honey


// extending types via intersection
type Animal = {
  name: string
}
type Bear = Animal & { 
  honey: boolean 
}

const bear = getBear();
bear.name;
bear.honey;
```

###### Extending with new field

```ts
// adding new fields to existing interface
interface Window {
  title: string
}
interface Window {
  ts: TypeScriptAPI
}

// A type cannot be changed after being created
type Window = {
  title: string
}
type Window = {
  ts: TypeScriptAPI
}
// Error: Duplicate identifier 'Window'
```



### Class 

```ts
class Point {
  x: number;
  y: number;

  constructor() {
    this.x = 1;
  }

  scale(n: number): void {
    this.x *= n;
    this.y *= n;
  }

  get length() {
    return this._length;
  }
  set length(value) {
    this._length = value;
  }
}
 
const pt = new Point();
pt.x = 0;
pt.y = 0;
```


<br />

### Interface 

```ts
interface Pingable {
  ping(): void;
}
 
class Sonar implements Pingable {
  ping() {
    console.log("ping!");
  }
}
```

<br />

### Abstract class

> we cannot make instance from abstract class, they are mainly for inheritance

```ts
abstract class Person {
  name: string;
  
  constructor(name: string) {
    this.name = name;
  }

  display(): void{
    console.log(this.name);
  }

  abstract find(string): Person;
}

class Employee extends Person { 
  // ....
```
<br />

### Enums
```ts
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = "YES",
}
```
<br />

### Types

```ts
// type alias
type Point = {
  x: number;
  y: number;
};

// type assertion 
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
```
<br />



### Generics vs Any

> no difference only but typing and hints

```ts
function identity(arg: any): any {
  return arg;
}

function identity<Type>(arg: Type): Type {
  return arg;
}

function loggingIdentity<Type>(arg: Array<Type>): Array<Type> {
  console.log(arg.length); // Array has a .length, so no more error
  return arg;
}
```

<br />

### TS to js compile result

```ts
class MyClass { // compile to Class
  name: string = ''
}
abstract class MyAbsClass { // compile to Class
  name: string = ''
}
interface MyInterface { // will not compile
  name: string
}
type MyType = {   // will not compile
  name: string
}
```

###### result in js

```js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MyClass {
  constructor() {
    this.name = '';
  }
}
class MyAbsClass {
  constructor() {
    this.name = '';
  }
}
```


<br />
