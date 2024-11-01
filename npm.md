## NPM notest

### How to use "npm link":
* In package that will be using: npm run build if needs, and `npm link`
* In project that uses package: `npm link [name-of-package]`
```
npm ls --link - show list of linked modules locally
npm ls --link --global  - show list linked global
```
