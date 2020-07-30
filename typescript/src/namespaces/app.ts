/// <reference path="form-ns.ts" />

namespace FormNs {
  class MyForm {
    private type: FormType = 'inline'
    private state: FormState = 'active'

    constructor(public email: string) {}

    getInfo(): FormInfo {
      return {
        type: this.type,
        state: this.state,
      }
    }
  }

  export const myForm = new MyForm('asd@asd.com')
}

console.log(FormNs.myForm)

