function readonly (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
  descriptor.writable = false;
};

class User {

  name: string;
  constructor(name: string){
      this.name = name;
  }

  @readonly
  print():void{
      console.log(this.name);
  }
}
let tom = new User("Tom");
tom.print = function(){console.log("print has been changed");}
tom.print();  // Tom