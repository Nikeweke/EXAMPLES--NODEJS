# Jest Examples

### Content
* Mock behaviour 1 function from package
* toHaveBeenNthCalledWith
* When different repos calling a few times


<br />


#### Mock behaviour 1 function from package

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

#### toHaveBeenNthCalledWith

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
<br />

#### When different repos calling a few times

```ts
// app.ts
const repo = ormManager.getRepository(PaymentEntity)
```

```ts
// app.test.ts
const mockedPaymentRepository = {} // methods
const mockedEventRepository = {} // methods
const mockedUserPaymentRepository = {} // methods

jest.spyOn(mockOrmManager, 'getRepository').mockImplementation((repoType) => {
  if (repoType.name === PaymentRepository.name) {
    return mockedPaymentRepository;
  }
  if (repoType.name === EventRepository.name) {
    return mockedEventRepository;
  }
  if (repoType.name === UserPaymentRepository.name) {
    return mockedUserPaymentRepository;
  }
  throw new Error(`Unexepected repo type requested: ${repoType.name}`);
});
```
