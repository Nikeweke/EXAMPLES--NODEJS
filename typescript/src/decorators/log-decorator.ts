function Log2 (target: Object, propertyKey: string) {
  console.log('target =', target)
  console.log('propertyKey =', propertyKey)
};

function Log3 (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log('target =', target)
  console.log('propertyKey =', propertyKey)
};

class Person {
  @Log2
  name: string;

  constructor(name: string){
    this.name = name;
  }

  @Log3
  print(): void{
    console.log(this.name);
  }

  @Log3
  get compName() {
    return this.name 
  }
}
let comp = new Person("Alex");
comp.print(); 