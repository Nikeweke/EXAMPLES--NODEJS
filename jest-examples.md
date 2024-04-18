# Jest Examples

### How to use it?

1. Add as dep library

```sh
# jest - libary for testing
# @types/jest - support for typescript
# supertest - for testing application end-to-end tests
npm install --save-dev jest @types/jest supertest
```

2. Add test for function with name "[name-file].spec.ts"

3. Add command to scripts section of package.json

```
 "scripts": {
    "test": "jest"
  },
```

4. run it with `npm run test`

### Cases to test 

1. Function with result 
  1.1. Mocking the packages 3-party
  1.2. Mocking DB requests

2. Route with requests to DB (requires supertest)
  2.1 Mocking the DB responses
  2.2. Mocking the answer for route
  2.3. Mocking packages 3-party

3. End-to-end test 
  - create an app
  - make request to route
  - prepare data for requesting route
  - write expectation

4. Using `__mocks__` - default mocking of package  

5. Creating mocks and testResources

6. Environment Variables - .env.test

---

* Mock behaviour 1 function from package
* `toHaveBeenNthCalledWith`

<br />


### Mock behaviour 1 function from package

```ts
// expressServer.test.ts

// example of package - "signature-validator": { validate }

// mocking whole package 
jest.mock('signature-validator');

describe('Express Server', () => {
   beforeEach(() => {
      jest.restoreAllMocks();
    });

  it('testing some function', () => {
    // ....
    const signatureValidator = require('signature-validator');
    jest.spyOn(package, 'validate').mockImplementation((message: string) => {
      console.log('++++++++++++++++++++++++');
      console.log(message); // here you can see what value was passed in process
      return Promise.resolve(true);
    });

    // here we call server route or function that inside call function "validate" from package "signature-validator"
    // and we mocking behaviour above
  })
})
```
<br />

### `toHaveBeenNthCalledWith` 

> specified function must be called with given args on specific time call 

###### app.ts
```ts
function main () {
  console.info(1)
  console.info(2)
  console.info({ test: 'ok' })
  console.info(4)
}
 ```

###### app.test.ts
```ts
it('passed testing argument to "toHaveBeenNthCalledWith" must match console.info argument passed on 3 time of call', async () => {
  expect(console.info).toHaveBeenNthCalledWith(4, {
     test: 'ok'
   });
})

```
