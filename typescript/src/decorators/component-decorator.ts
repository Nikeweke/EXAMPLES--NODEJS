// Angular example of using decorators

interface ComponentDecorator {
  selector: string
  template: string
}

function Component(config: ComponentDecorator) {
  return function (Constructor: any) {
    return class extends Constructor {
      constructor(...args: any) {
        super(...args) // call constructor of CardComponent
        this.selector = config.selector
      }
    }
  }
}

// function Bind(_: any, _2: any, descriptor: PropertyDescriptor): PropertyDescriptor {
//   let original: any 

//   if (descriptor) { 
//     original = descriptor.value
//   }

//   return {
//     configurable: true,
//     enumerable: false,
//     get() {
//       return original.bind(this)
//     }
//   }
// }

@Component({
  selector: '#card',
  template: `
    <div class="card">Hello</div>
  `
})
class CardComponent {
  // name: string 
  // constructor(name: string) {
  //   this.name = name
  // }
  // selector: string

  // SAME AS ABOVE constructor
  constructor(public name: string, public selector?: string) {} // selector?: optional param

  // @Bind
  logName(): void {
    console.log(`Comp name =`, this.name, this.selector)
  }
}

const card = new CardComponent('MyCardComp')
card.logName()