# Node + Typescript 

### Article
* [Medium](https://medium.com/javascript-in-plain-english/typescript-with-node-and-express-js-why-when-and-how-eb6bc73edd5d]
* [Typescript - tutorialPoint](https://www.tutorialspoint.com/typescript/typescript_tuples.htm)

### Quick start
```sh
npm init -y 

# Install deps
npm i express typescript @types/express ts-node-dev -S
# @types/express - types of express for typescript
# ts-node-dev - for only dev mode without building
```

`package.json`
```json
"scripts": {
    "tsc": "tsc",
    "dev": "ts-node-dev --respawn --transpileOnly ./app/app.ts",
    "prod": "tsc && node ./build/app.js"
  },
```

```sh
# Init tsconfig.js file for typescript
npm run tsc -- --init
```

Uncomment `outDir` in **tsconfig.js** for receving builds