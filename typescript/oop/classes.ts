
export interface Animal {
  talk(): void
}

export class Cat implements Animal {
  //field 
  name: string = ''; 

  constructor (name: string) {
    this.name = name
  }

  talk(): void {
    console.log(this.name + ' says - Mew')
  }
}

export class Dog implements Animal {
  //field 
  name: string = ''; 

  constructor (name: string) {
    this.name = name
  }

  talk(): void {
    console.log(this.name + ' says - Gaw')
  }
}

// export { Animal, Cat, Dog }