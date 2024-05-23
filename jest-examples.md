# Jest Examples

### Content
* [Mock behaviour 1 function from package](#mock-behaviour-1-function-from-package---%EF%B8%8F-on-top)
* [toHaveBeenNthCalledWith](#tohavebeennthcalledwith---%EF%B8%8F-on-top)
* [When different repos calling a few times](#when-different-repos-calling-a-few-times---%EF%B8%8F-on-top)
* [Override some function from package for specific case without impacting all package](#override-some-function-from-package-for-specific-case-without-impacting-all-package---%EF%B8%8F-on-top)
* [⚠️ You cannot make spy on mocked object](#you-cannot-make-spy-on-mocked-object---%EF%B8%8F-on-top)
* [⚠️ You cannot override behaviour of function that located in the same file](#you-cannot-override-behaviour-of-function-that-located-in-the-same-file---%EF%B8%8F-on-top)

<br />


#### Mock behaviour 1 function from package - [⬆️ on top](#content)

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

#### toHaveBeenNthCalledWith - [⬆️ on top](#content)

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

#### When different repos calling a few times - [⬆️ on top](#content)

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
<br />

#### Override some function from package for specific case without impacting other cases in test file - [⬆️ on top](#content)

```ts
import * as customerFlow from '@flows/Customer';

// mock package and supply there real implementation
// (it won't impact other things except case where you making spy, below)
jest.mock('@flows/Customer', () => {
  return {
    ...jest.requireActual('@flows/Customer'),
    __esModule: true,
  };
});

// .......

it('......', () => {
   // for specific case do spy
   const spy1 = jest.spyOn(customerFlow, 'deleteCrossReference');
   expect(spy1).not.toBeCalled();
   
   // OR make another implementation
   const spy1 = jest.spyOn(customerFlow, 'deleteCrossReference').mockImplementation(() => {});
})
```
<br />

#### You cannot make spy on mocked object - [⬆️ on top](#content)

###### Wrong ❌
```ts
const mockedCustomerConsent = jest.mock('./CustomerConsent');

// wont work 
jest.spyOn(mockedCustomerConsent, 'getAccessToken').mockImplementation(() => accessToken);
```

###### Right ✅
```ts
import * as customerConsent from './CustomerConsent';

jest.mock('./CustomerConsent');

describe('....', () => {
   it('....', () => {
      // making spy on mocked package, if package was not previously mocked it will be an error - jest.mock('./CustomerConsent');
      const spySomeFunction = jest.spyOn(customerConsent, 'someFunction').mockImplementation(() => {});

      // .......

      expect(spySomeFunction).toBeCalled()
   })
})

```
<br />

#### You cannot override behaviour of function that located in the same file - [⬆️ on top](#content)

###### ⁉️ Problem

```js
function test1() {}
function test2() {
  test1()
}

module.exports = {
  test1, test2
}

```
```js
import * as myFunctions from './my-file'
it('...', () => {
   // this override wont work because it will use still actual implentation, because this function in the same file
  jest.spyOn(myModule, 'test1').mockImplementation(() => {...});

   await myFunctions.test2()
})

```

###### ✅ Solution
```ts
 // it will not work, it will use actual implentation, to solve this:
  * Move function to separate file
  * Avoid using same function in testing function
  * Mock all functions that in the "test1"
```
