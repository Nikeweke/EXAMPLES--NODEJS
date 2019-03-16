
// Example of Importing classes and using them
import {Animal, Cat, Dog} from './app/second'

let cat = new Cat('Matroskin')
let dog = new Dog('Sharik')

// tied by one interface
function animalTalker(animal: Animal) {
  animal.talk()
}

animalTalker(cat)
animalTalker(dog)



// Express example
import express = require('express');

// Create a new express application instance
const app: express.Application = express()

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});