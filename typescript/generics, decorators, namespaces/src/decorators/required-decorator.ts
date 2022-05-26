
// type of 2 option
type ValidatorType = 'required' | 'email'

// schema of "validators" object
interface ValidatorConfig {
  [prop: string]: {
    [validateProp: string]: ValidatorType
  }
}

// holds validation fields that marked with @Required
const validators: ValidatorConfig = {}

// Decorator
function Required(target: any, propName: string) {
  const className = target.constructor.name 
  validators[className] = {
    ...validators[className],
    [propName]: 'required'
  } 
}

// validate form
function validate(obj: any): boolean {
  const className = obj.constructor.name
  const objConfig = validators[className]
  if (!objConfig) {
    return true
  } 

  let isValid = true
  Object.keys(objConfig).forEach((key) => {
    if (objConfig[key] === 'required') {
      isValid = isValid && !!obj[key]
    }
  }) 
  return isValid
}

class Form {
  @Required
  public email: string | void

  constructor(email?: string) {
    this.email = email
  }
}

const form = new Form('llll')
console.log(form)

if(validate(form)) {
  console.log('Valid', form)
} else {
  console.log('Validation error')
}