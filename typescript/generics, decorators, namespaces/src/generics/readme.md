# Generics

[Tutorial](https://www.youtube.com/watch?v=7NU6K4170As)

###### Example 1
```ts
const cars: string[] = ['Ford', 'Audi']
const cars2: Array<string> = ['Ford', 'Audi'] // <string> - это generic
```

###### Example 2 - "Promise return type"
```ts
// =====================> Example 2
// generic sepcifie that number will be returned
const promise: Promise<number> = new Promise((res) => {
  res(42)
})
```

###### Example 3 - "mergeObjects"
```ts
// T and R - here can be another letter
// "T extends object" - says that we will receive only arguments type of "object" 
function mergeObjects<T extends object, R extends object>(a: T, b: R): T & R {
  return Object.assign({}, a, b)
}

const merged = mergeObjects({name: 'Amigo'}, {age: 30})
// const merged2 = mergeObjects('123', '345') // makes error 
```

###### Example 4 - "ILength"
```ts
// not any value has length - thats why we create interface and use it below
interface ILength {
  length: number
}

function withCount<T extends ILength>(value: T): object {
  return {
    value, 
    count: 'Length - ' + value.length
  }
}
```

###### Example 5 - "R extends keyof T"
```ts
// "R extends keyof T" - R(key) will define type depends on type of T object
function getObjectValues<T extends object, R extends keyof T>(obj: T, key: R) {
  return obj[key]
}

const person = {
  name: 'Alex',
  age: 22,
  job: 'developer'
}

console.log(getObjectValues(person, 'name'))
```

###### Example 6 - "Partial<>"
```ts
interface Car {
  model: string
  year: number
}

function createAndValidateCar(model: string, year: number): Car {
  // "Partial" prevent error cuz we init empty object
  // and will fill it later
  const car: Partial<Car> = {}

  if (model.length > 3) {
    car.model = model
  }

  if (year > 10) {
    car.year = year
  }


  return car as Car
}
```

###### Example 7 - "Generic class"
```ts
class Collection<T extends number | string> {
  constructor(private _items: T[] = []) {}

  add(item: T) {
    this._items.push(item)
  }

  remove(item: T) {
    this._items = this._items.filter(i => i !== item)    
  }

  get items(): T[] {
    return this._items
  }
}

const strings = new Collection<string>(['I', 'Am', 'string'])
strings.add('!!')
strings.remove('Am')
console.log(strings.items)

const numbers = new Collection<number>([1, 2, 3])
numbers.add(1)
numbers.remove(2)
console.log(numbers.items)
```

###### Example 8 - "Readonly"

```ts
class Car {
  model: string
  year: number
}

const cars: Readonly<Array<string>> = ['Ford', 'Audi']
cars.shift() // error

const ford: Readonly<Car> = {
  model: 'Ford',
  year: 2020
}

ford.model = 'Ferrari' // error
 
```