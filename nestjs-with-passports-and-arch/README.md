# Nestjs with Passport(Local, JWT) + Architecture

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