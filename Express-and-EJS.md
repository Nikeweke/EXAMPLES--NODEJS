
#   Express.js & EJS.js 

>  About Express.js -framework & Ejs.js as templater


## Express.js

####   Подключение и инициализация Express.js
```javascript
// Библиотеки
var express = require('express'); // express framework

// иниц. Express-framework
var app = express();
```



####   Запуск сервера
```javascript
app.listen(3000);
```



####   Маршруты
```javascript
// отправит обычный текст
app.get('/',         function(req, res){ res.end('sss'); })
app.get('/shit/',    function(req, res){ res.end('sss1'); })
app.get('/shit/:id', function(req, res){ res.end('ID->' + req.params.id); })

// отправить страницу
app.get('/',      function(req, res){ res.sendFile(__dirname + '/index.html'); })

// Генерим вьху(путь к вьюхе не указываем так как по дефолту папка должна быть "views")(profile - profile.ejs - это вьюха)
// тут передаем параметр на страницу под переменной person - ROUTING
app.get('/',      function(req, res){   res.render('profile', { person: "Bad dude" }   );   })
```




####   Получить данные из запроса( GET )
```javascript
 function TestGET(req, res)
 {
     console.log(req.query);   // получить массив который пришел в запросе
     console.log(req.query.shit);  // получить значение из массива который пришел в запросе

     res.render('test', {shit:req.query.shit})
 }
```


####   Получить данные из запроса( POST)
```javascript
// установить пакет для парса данных
npm install body-parser // -save

// обозначить его в коде (app.js)
var bodyParser = require('body-parser'); 


// middleware - парсер для POST-запросов
var urlencodedParser = bodyParser.urlencoded({ extended: false }) 

// маршрут
app.post('/shit/',  urlencodedParser ,  function(req,res){ TestPOST(req, res);  })

// функция 
 function TestPOST(req, res)
 {
   console.log(req.body);                     // показать массив 
   res.render('success', {data: req.body});   // выслать массив на шаблон - "success" 
 }

// шаблон - "success" 
// Чтобы увидеть полностью массив - тогда console.log(req.body)
// На шаблоне - через точку   
  <%=  data.name  %>
````  



## EJS.js
####  Подключение шаблонизатора Ejs.js
```javascript
// установка в проект(cmd)
npm install ejs // -save for dependecies

// установим ejs-шаблонизатор как генератор вьюх(в коде app.js)
app.set('view engine', 'ejs');
```



####  Использование в шаблонах данных
```javascript
// -> html
<h2> <%= person %> </h2>                    // <%= ... %> - когда вывод переменной
<% data.hobbies.forEach(function(item){ %> //  <% ...  %> - когда валит JS
```



####  Вывод вложенных данных из массива на шаблоне
```javascript
// массив такой - app.js
var data = { age: 21,
             name: 'BRaker',
             hobbies: ['eat','shit']
           }

// это делаеться через цыкл forEach - profile.ejs
<% data.hobbies.forEach(function(item){ %>
       <%= item %>
<% }); %>
```


####  INCLUDE - включение кусков HTML
```javascript
// в папке views создаем папку , название не имеет значение(for ex: directory "elem"),
// \views -
//         profile.ejs 
//         elem -> nav.ejs
// и в шаблоне пишем(поиск в папке "views"):
// --- profile.ejs
<% include elem/nav.ejs %>
```
