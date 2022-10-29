# Nestjs with Passport(Local, JWT) + Architecture

* [Passport tutorial - local strat](https://progressivecoder.com/how-to-implement-nestjs-passport-authentication-using-local-strategy/)
* [Passport tutorial - jwt strat](https://progressivecoder.com/how-to-implement-nestjs-jwt-authentication-using-jwt-strategy/)


---


### What can be added here?

* Use cases - methods from ".service.ts" files can go to folder "use-cases". Injecting in service class like

```js
import { someMethod } from './use-cases/_index'

class AppService {
  // ...

  someMethod = someMethod
}
```

* Gathering decorators into separate files if it is getting big (use "applyDecorators" and separate folder)
