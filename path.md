## `Path` package 

Its convinient to use when you don't know with what OS you will work and in what direction slashes will be. 
Package `path` automatically sets right slashes and resolves pathes. 

```js
const path = require('path')

path.resolve('some-file.js') // C:\CODING\my-app\some-file.js

path.join('stuff', 'some-file.js') // stuff\some-file.js

path.basename('C:\CODING\my-app\some-file.js') // some-file.js

path.dirname('some-file.js') // .

path.extname('some-file.js') // .js


```
