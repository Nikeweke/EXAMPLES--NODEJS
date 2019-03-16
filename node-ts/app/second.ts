
export interface Animal {
  talk(): string
}

export class Cat implements Animal {
  //field 
  name: string = ''; 

  constructor (name: string) {
    this.name = name
  }

  talk(): string {
    return this.name + ' says - Mew'
  }
}

export class Dog implements Animal {
  //field 
  name: string = ''; 

  constructor (name: string) {
    this.name = name
  }

  talk(): string {
    return this.name + ' says - Gaw'
  }
}

// export { Animal, Cat, Dog }