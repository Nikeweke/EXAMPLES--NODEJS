>   Чтобы запустить файл для node.js 
>   надо перейти в ту директорию где лежит файл app.js и тогда написать в cmd или Git bash - node app.js


####   Создание сервера

```javascript
var http = require('http');

// создать сервер
var server = http.createServer(function(req, res)
             {
                // пишем Headers для нормальонго отображения текста
                res.writeHead(200, {'Content-Type': 'text/plain'})

                // вывести какой запрос был
                console.log('request was made: ' + req.url);

                // отсылаем ответ
                res.end('Shit');
             });
             
// запуск сервера
server.listen(3000, '127.0.0.1');

console.log('Server is Launched');
```





####  Подключение одного файла к другому (count.js -> app.js)

```javascript
//-----count.js
counter = function(arr){ return 'There are ' + arr.length; };
function counter1(a,b){  return `There is ${a+b}`;  };
var pi = 3.4;

 // 1 Case of Exports
 module.exports = {
   counter: counter,
   counter1: counter1,
   pi: pi
 };

 // 2 Case of Exports
module.exports.counter = counter;
module.exports.counter1 = counter1;
module.exports.pi = pi;

//------app.js
stuff = require('./count')

console.log(stuff.counter(['shit', 'crystal']))
console.log(stuff.counter1(1,2))
```

        


####   Вызов событий (event Emitter)

```javascript
var events       =    require('events');
var eventEmitter =    new events.EventEmitter();

function Hello(){ console.log('Hello m8 and goodbye'); }

eventEmitter.on('Boom', Hello)
eventEmitter.emit('Boom');
```




####   Запись и чтения из файла(txt)

```javascript
var fs = require('fs'); // подключаем библиотеку для чтения и записи файла

//------------------------ ....FileSync - указывает на то что пока не прочитаю файл до конца не пойду дальше - Синхронно
var shitTxt = fs.readFileSync('shit.txt', 'utf8'); // читаем файла
console.log(shitTxt); // выводим

fs.writeFileSync('writeMe.txt', shitTxt); // создает и пишет в него то что есть в файле "shit.html"
//------------------------

//------------------------ ....File - указывает на то что код пойдет выполянться дальше - Асинхрон
fs.readFile('shit.txt', 'utf8', function(err, data)
{
  fs.writeFile('writeMe.txt', data);
})
//------------------------
```




####   Создание и удаление файлов, папок
```javascript
var fs = require('fs'); // подключаем библиотеку для чтения и записи файла

// удлалить файл в папке "" и удалить саму папку. Удалить папку если она не пуста не выйдет
fs.unlink('./stuff/writeMe.txt', function()
 {
    fs.rmdir('stuff');
  })

// ------------------------- Sync
// создать директорию
fs.mkdirSync('stuff');

// удалить директорию
fs.rmdirSync('stuff');
// ------------------------- Sync

// ------------------------- ASync
fs.mkdir('stuff', function()
 {
     fs.readFile('readMe.txt', 'utf8', function(err, data)
      {
        fs.writeFile('./stuff/writeMe.txt', data);
      });
 })
// ------------------------- ASync
```



###  Пишущие и читающие потоки и Буферы 
>  Разница между этим способом и fs.writeFile & fs.ReadFile
>  - с потоками вроде как быстрее из-за разбивание на кусочки инфы

####  Читаем файл через поток (прикол в чем: в том что если файл большой то он передаеться частями)
```javascript
var fs = require('fs');

var myReadStream = fs.createReadStream(__dirname + '/shit.txt', 'utf8');

myReadStream.on('data', function(chunk)
 {
    console.log('chunk:');
    console.log(chunk);
 });
```


####  Читаем файл через поток и записываем в другой файл через пишущий поток

```javascript
var fs = require('fs');

var myReadStream = fs.createReadStream(__dirname + '/shit.txt', 'utf8'); // создание потока который читает
var WStream = fs.createWriteStream(__dirname + '/Wshit.txt'); // создание потока который пишет

myReadStream.on('data', function(chunk)
 {
    // вывод того что прочитали
    console.log('chunk:');
    console.log(chunk);

    // пишем в наш поток из файла данные
    WStream.write(chunk);
 });
```

####  Трубы (Pipes)(Автоматическое перенаправление читающего потока в пишущий для записи или вывода )

```javascript
var fs = require('fs');

var RStream = fs.createReadStream(__dirname + '/shit.txt', 'utf8'); // создание потока который читает
var WStream = fs.createWriteStream(__dirname + '/Wshit.txt'); // создание потока который пишет

// Направить прочитанную информацию для записи в файл
RStream.pipe(WStream);

/// ** Antoher Example ** \\\
var http = require('http');
var fs = require('fs');

// создать сервер
var server = http.createServer(function(req, res)
             {
                // пишем Headers для нормальонго отображения текста
                res.writeHead(200, {'Content-Type': 'text/plain'})

                // вывести какой запрос был
                console.log('request was made: ' + req.url);

                var RStream = fs.createReadStream(__dirname + '/shit.txt', 'utf8'); // создание потока который читает

                // отсылаем ответ 
                // данные прочитаные с файла отдаем в ответ
                RStream.pipe(res);
             });

// запуск сервера
server.listen(3000, '127.0.0.1');

console.log('Server is Launched');
```


####  Вывод HTML-страниц

```javascript
var http = require('http'); // http
var fs = require('fs'); // Read and Write Stream

 // создать сервер
   var server = http.createServer(function(req, res)
                {
                    res.writeHead(200, {'Content-Type': 'text/html'}) // пишем  для  отображения html
                  // res.writeHead(200, {'Content-Type': 'text/html'}) // пишем  для  отображения обычного текста

                   // вывести какой запрос был
                   console.log('request was made: ' + req.url);

                   var RStream = fs.createReadStream(__dirname + '/index.html', 'utf8'); // создание потока который читает

                   // отсылаем ответ
                   // html-страница
                   RStream.pipe(res);
                });

   // запуск сервера
   server.listen(3000, '127.0.0.1');

   console.log('Server is Launched');
```


####  Вывод JSON-данных

```javascript
var http = require('http'); // http

 // создать сервер
   var server = http.createServer(function(req, res)
                {
                    res.writeHead(200, {'Content-Type': 'application/json'}) // пишем  для  отображения json

                    var myJson = {
                                   name:     "James",
                                   surname:  "Hetfield",
                                   age:       50
                                 };
                    res.end(JSON.stringify(myJson));

                });

   // запуск сервера
   server.listen(port, '127.0.0.1');

   console.log('Server is Launched on port ' + port);
```
