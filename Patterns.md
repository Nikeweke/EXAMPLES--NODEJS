# Patterns

### Observer 
```js
// Function-class
function Subject (name, size) {
  this.observers = []
}

Subject.prototype = {
  subscribe(fn) {
     this.observers.push(fn)
     return this
  },
  
  unsubscribe(fnToRemove) {
    this.observers.filter((fn) => {
      if (fn != fnToRemove) {
        return fn
      }
    })
    return this
  },
  
  fire() {
    this.observers.forEach((fn) => {
      fn.call()
    })
    return this
  }
}

const subject = new Subject()


function Observer(index = 0) {
  console.log('Observer ', index)
}

// setting context of Subject class, and pass as param "index" - bind doesnt call method but prepare for call
subject.subscribe(Observer.bind(Subject, 2)).fire()

```
