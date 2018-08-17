## Компилирование js
Можно использовать для маленьких проектов, но большие пакует с ошибками.

[**zeit/pkg**](https://github.com/zeit/pkg)

### Quick Start
```bash
npm i pkg -g

pkg app.js

# specify OS
pkg -t win app.js
```


```js
// app.js
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
```
