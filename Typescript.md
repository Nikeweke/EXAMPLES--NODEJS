# Typescript 

* Init project
* Class
* Interface
* Abstract class
* Mixin
* Enums
* Types


---


### Init project

```sh
npm init -y

# globally install ts
npm install -g typescript

# OR install in project 
npm install -S typescript
npm install -D ts-node # run ts instatly

# run below command thru package.json > "scripts" section if locally installed
# "create-tsconfig": "tsc --init",
# "app": "tsc app.ts",
# "app-no-tsconfig": "tsc app.ts -w"

# init tsconfig.json
tsc --init

# compile app with tsconfig.json setup in js
tsc app.ts

# compile app without tsconfig.json setup in js
tsc app.ts -w

# enable experimental decorators in js
tsc app.ts -t ES5 --experimentalDecorators

```
<br />

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

### Mixin
<br />

