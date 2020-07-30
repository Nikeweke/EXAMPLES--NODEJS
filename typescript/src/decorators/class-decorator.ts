// Декоратор sealed с помощью функции Object.seal запрещает расширение прототипа класса User.
function Sealed(constructor: Function) {
  console.log("sealed decorator");
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@Sealed
class User {
  name: string;
  constructor(name: string){
      this.name = name;
  }
  print():void{
      console.log(this.name);
  }
}

// makers error
Object.defineProperty(User, 'age', {
  value: 17
});


// =======================================================> Second example


// Декоратор logger пишет в лог если новый экземпляр был создан
function logger<TFunction extends Function>(target: TFunction): TFunction{
  let newConstructor: Function = function(name:string){
      console.log("Creating new instance");
      this.name = name;
      this.age = 23;
      this.print = function():void{
          console.log(this.name, this.age);
      }
  }
  return <TFunction>newConstructor;
}

@logger
class User2 {
  name: string;
  constructor(name: string){
      this.name = name;
  }
  print():void{
      console.log(this.name);
  }
}
let tom = new User2("Tom");
let bob = new User2("Bob");
tom.print();
bob.print();