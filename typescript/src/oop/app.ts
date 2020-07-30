
// Example of Importing classes and using them
import { Animal, Cat, Dog } from './classes'

let cat = new Cat('Matroskin')
let dog = new Dog('Sharik')

// tied by one interface
function makeAnimalTalk(animal: Animal) {
  animal.talk()
}

makeAnimalTalk(cat)
makeAnimalTalk(dog)


