
# Decorators

> Decorator - its a function that extend entity, and recieves params based on where its applyies

* [Guide to decorators and reflect-metadata](http://blog.wolksoftware.com/decorators-metadata-reflection-in-typescript-from-novice-to-expert-part-4)
* [Logger decorator example](https://medium.com/swlh/logging-with-decorators-in-typescript-1c3ce13576d5)

<br />

### Places where you can apply "decorator" 

(class, property, method, parametr, accessor)

```ts
@classDecorator
class Person {

  @propertyDecorator
  public name: string;

  @accessorDecorator
  get fullName() {
    // ...
  }

  @methodDecorator
  printName(@parameterDecorator prefix: string) {
    // ...
  }
}
```

### Multiple decorators

```ts
@decoratorA
@decoratorB
class Person {}
```
<br />

### Simple decorator

```ts
// ("target" here is constructor of class where its applying)
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Person {}
```
<br />

### Decorator factory (use when need to pass additional params)

here we adding the field (`cardId`) to class using decorator 

```ts
function BankCard(cardId: number) : Function {
  return function(constructor: Function) {
    constructor.prototype.cardId = cardId
  }
}

@BankCard(1234) // params are mandatory, without it will be error
class HSBCBankCard {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const card = new HSBCBankCard("Michael");

console.log(card.name);
// @ts-ignore
console.log(card.cardId); 

// @ts-ignore using here cuz ts-compile will cause error, 
// cuz cardId does not exist on HSBCBankCard
```
<br />

### Property decorator

set decorator on "property" which adding logic when value set or get from property

```ts
function propertyInformation(target: Object, propertyKey: string) {
  let value: string = this[propertyKey];

  const get = function () {
    console.log(`${propertyKey} value: ${value}`);
    return value;
  };

  const set = function (val: string) {
    console.log(`new ${propertyKey} value: ${val}`);
    value = val;
  };
  Object.defineProperty(target, propertyKey, { set, get });
}

class BankPropertyDecorator {
  name: string;

  @propertyInformation
  pin: string;

  constructor(name: string, pin: string) {
    this.name = name;
    this.pin = pin;
  }
}

const bankPropertyDecorator = new BankPropertyDecorator("Ashley", "123456");
bankPropertyDecorator.pin;
bankPropertyDecorator.pin = "654321";

```
<br />

### Method decorator 

```ts
const methodToKeyMap = {
  withdrawFromAccountA: "accountA",
  withdrawFromAccountB: "accountB",
};

const minimumAmount = (amount: number) => {
  return (
    target: Object,
    propertyKey: string, // name of called function 
    descriptor: PropertyDescriptor // function itself
  ) => {
    console.log('decorator')

    const originalFn = descriptor.value;

    descriptor.value = function (...args: any) {
      console.log('args inside decorator:', args)
      // this[methodToKeyMap[propertyKey]] - gets value from fields: accountA or accountB
      // this - here its context of object (BankMethodDecorator { accountA: 200, accountB: 1000 })

      if (this[methodToKeyMap[propertyKey]] - args[0] > amount) {
        // originalFn(args)
        originalFn.call(this, args);
      } else {
        console.log(`${methodToKeyMap[propertyKey]}: Not enough money`);
      }
    };

    return descriptor;
  };
};

class BankMethodDecorator {
  accountA: number = 200;
  accountB: number = 1000;

  @minimumAmount(100)
  withdrawFromAccountA(amount: number) {
    this.accountA = this.accountA - amount;
  }

  @minimumAmount(200)
  withdrawFromAccountB(amount: number) {
    console.log('withdrawFromAccountB called')
    this.accountB = this.accountB - amount;
  }
}

console.log()
const bankMethodDecorator = new BankMethodDecorator();

bankMethodDecorator.withdrawFromAccountA(200);
console.log('accountA =', bankMethodDecorator.accountA, '\n');

bankMethodDecorator.withdrawFromAccountB(200);
console.log('accountB =', bankMethodDecorator.accountB);
```
<br />

### Accessor decorator 

```ts
function upperCase(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  return {
    enumerable: false,
    configurable: false,
    get: function () {
      return descriptor.get.call(this).toUpperCase();
    },
    set: function (name: string) {
      descriptor.set.call(this, name);
    },
  };
}

class BankHolder {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  @upperCase
  get accountName(): string {
    return this.name;
  }

  set renameAccountHolder(name: string) {
    this.name = name;
  }
}

const kenny = new BankHolder("Kenny");
console.log(kenny.accountName);
```
<br />


### Parametr decorator 

```ts
function print(target: Object, propertyKey: string, parameterIndex: number) {
  console.log(`Decorating param ${parameterIndex} from ${propertyKey}`);
}

class TestClass {
  testMethod(param0: any, @print param1: any) {}
}

```
<br />


### Params of decorators functions to each case 

```ts
declare type ClassDecorator = <TFunction extends Function>(
  target: TFunction
) => TFunction | void;

declare type PropertyDecorator = (
  target: Object,
  propertyKey: string | symbol
) => void;

declare type MethodDecorator = <T>(
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<T>
) => TypedPropertyDescriptor<T> | void;

declare type ParameterDecorator = (
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number
) => void;
```
