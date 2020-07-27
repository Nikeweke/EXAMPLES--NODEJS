# Node + Typescript 

* [Typescript-with-node-and-express-js-why-when-and-how](https://medium.com/javascript-in-plain-english/typescript-with-node-and-express-js-why-when-and-how-eb6bc73edd5d)
* [TutorialPoint](https://www.tutorialspoint.com/typescript/typescript_tuples.htm)
* [Typescript - Data types](https://metanit.com/web/typescript/2.5.php)
* [Typescript - Decorators](https://metanit.com/web/typescript/6.1.php)

### Quick start
```sh
npm i

# start dev ts server 
npm run oop:dev
npm run expressjs:dev

# make build and run 
npm run oop:prod
npm run expressjs:prod

# needs to allow experimental decorators
npm run decorators:dev
node decorators/app.js
```

### Typescript commands

###### create tsconfig.json
```sh
tsc --init 
```

###### tsconfig.js в этом случае игнорируеться
```sh
tsc app.ts -w  
```

###### Включить поддержку декораторов
```sh
tsc app.ts -t ES5 --experimentalDecorators
```

