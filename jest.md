# Jest

* Setup jest in project
* Create and run tests
* Knex-mock and tracker

--- 

### Setup jest in project

###### installing jest as dev dep

```sh
> npm install --save-dev jest
```

###### add to package.json "scripts" section

```json
"scripts": {
  ...
  "test": "jest --runInBand --verbose"
}
```

###### you can place jest settings in file `jest.config.js` or in `package.json` - "jest" section
```js
// jest.config.js
module.exports = {
  setupFiles: ["<rootDir>/jest/setup-tests.js"],
  testMatch: [  // default values for testMatch, change it if wanna run only some tests, if not remove this key
    "**/__tests__/**/*.[jt]s?(x)", 
    "**/?(*.)+(spec|test).[jt]s?(x)" 
  ]
};

// package.json 
{
  ...
  "jest": {
    "setupFiles": ["<rootDir>/jest/setup-tests.js"],
  }
}
```

###### `setup-tests.js` example
```js
// setup-tests has to load env variable that application needs before tests
require('dotenv').config({ path: './.env' });
global.COGNITO_TOKEN_FOR_TEST = 1234
```
<br />


### Create and run tests
Make folder `__tests__`, there files `[name].test.js` and write some test and then run cli command:

```sh
npm run test
```

> https://jestjs.io/ru/docs/cli#--verbose

* `--coverage` - Указывает, что следует собирать и отображать информацию о тестовом покрытии
* `--runInBand` (alias "-i") -  Последовательно выполняет все тесты в текущем процессе вместо создания пула дочерних рабочих процессов, которые выполняют тесты. Может быть полезно для отладки.
* `--verbose` - Отображает результаты отдельных в иерархии набора тестов
* `--bail 3` - stop after 3 failed tests

<br />


### Knex-mock and tracker

#### What is knex-mock and tracker

Knex-mock replace dbInstance create by knex with mocked one, so when you pass mocked instance no real connection needs, and all sql queries will be intercepted with "tracker"

#### Setup of dbInstance creation
```js
const knex = require("knex");
const mockKnex = require('mock-knex');
const bookshelf = require("bookshelf");

const createDb = (dbName, connectionDetails) => {
  const dbDatabase = process.env.DB_CONNECTION;
  const available = ["pg", 'sqlite3', 'mysql', 'mysql2', 'oracledb', 'tedious'];

  if (available.indexOf(dbDatabase) < 0) {
    throw new Error("Unsupported db istance", dbDatabase);
  }

  let connection
  
  if (process.env.NODE_ENV === 'test') {
    connection = knex({ client: 'mysql', debug: false });
    mockKnex.mock(connection, 'knex@0.10');
    
  } else {
    connection = knex({
      client: dbDatabase,
      connection: {
        database: dbName,
        ...connectionDetails,
        charset: "utf8",
        ssl:
          process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
      },
    });
  }

  return bookshelf(connection);
};

module.exports = { createDb };

```


#### Test example
```js
const mockKnex = require('mock-knex');
const tracker = mockKnex.getTracker();

// this apiCall - build routing of app and allow to call route
const apiCall = require('../../jest/apiCall')

describe('(Add asset) POST /account/asset', () => {

  beforeAll(() => {
    if (!global.COGNITO_TOKEN_FOR_TEST) {
      console.log('FATAL: COGNITO_TOKEN_FOR_TEST must be defined in setup-test.js')
      process.exit(2)
    }

    tracker.install();
    tracker.on('query', (query,step) => {
      console.log(query)
      if (step === 1) {
        query.response([{
          id:        1,
          cognito_uuid: '12341',
          email:     'a.a@mail.com'
        }])
      }
    })
  })

  
  it("should return 200", async () => {
    const token = global.COGNITO_TOKEN_FOR_TEST

    // in "apiCall" triggers work with DB that intercepted by "tracker" above
    const response = await apiCall("POST", "/account/asset", {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      payload: {
        "businessEntityId": null,
        "name": "Lauraly Atria",
        "type": "personal",
        "currency": "usd",
        "category": "td_1m"
      },
    })

    expect(response.statusCode).toBe(200);
  });

  // ...

```

###### Find user 
``` js
// "User" - bookshelf model
User.where('cognito_uuid', userCognitoId).fetch({ require: false })
  .then((d) => (d && d.attributes) || null)

// tracker query body
 {
  method: 'select',
  sql: 'select users.* from users where cognito_uuid = ? limit ?',
  bindings: [ '12341', 1 ],
  // ...
 }
```

###### Create user 
``` js
// "User" - bookshelf model
await new User({
  requested_account_id: 1,
  personal_data: '123',
  user_id: 1,
  ownership_percentage: 0,
  email: 'ex@ex.com',
  first_name: 'first', 
  last_name: 'last',
  trudesk_ticket_id: 123
}).save()

// tracker query body
{
  method: 'insert',
  sql: 'insert into `users` ....',
  bindings: [ ... ],
  // ...
}
```

###### Update user 
``` js
// "User" - bookshelf model
await User.where("id", 2).save({ name: 123 }, { patch: true })

// tracker query body
{
  method: 'update',
  sql: 'update `users` set `name` = ? where `id` = ?',       
  bindings: [ 123, 2 ],
  // ...
}
```

###### Deleting user 
``` js
// "User" - bookshelf model
await User.query().where('user_id', 1).del()

// tracker query body
{
  method: 'del',
  sql: 'delete from `users` where `user_id` = ?',
  bindings: [ 1 ],
  // ...
}
```
