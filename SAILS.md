# Проект на Sails(Node) - Basic + Локализация

#### Понятный курс по адресу: https://www.youtube.com/watch?v=HrchcED6TKY

---
* Комманды в консоле
* Localize stuff
* Services
* Middleware (aka Policies) - how to use
* Cookies
* Подключение к БД
* Шаблонизатор (EJS)
* Маршруты
* В Продакшене
* req(Request)


---



## Комманды в консоле:
* **sails lift** - поднять сервер Sails
* **sails new MyProject** - создаст проект в папке где находишься
* **sails generate controller page** - создает контроллер PageController.js
* **sails generate api status** - создает StatusController.js(api/controllers) и Status.js(api/models)

## Localize stuff или как Сделать версии сайта на разные языки
* в папке **config/locales** - создаем свой файл где будут переменные ru.json
* в папке **config/i18n** - расскоментить строку с массивом где языки, и добавить туда свой язык
* в папке **api/policies** - создаем свой Middleware **localize.js** для перехвата с url версию сайта(ru, de, fr ...)
* в папке **config** - открыть **policies.js** - и написать свой Middleware**(localize.js)** для всех запросов 
* Используем в шаблоне переменные из файла **ru.json**
* Так же можно писать локализацию прямо в методе 
```js
  Index: function(req, res, next)
  {
    req.setLocale('ru');
  },
```

##### ru.json
```json
{
  "Welcome": "Привед медвед",
  "Goodbye": "Покеда."
}
```
##### routes.js
```js
 'get  /':             function(req, res) { return res.redirect('/en/'); },
 'get  /:lang':        'UserController.Index',
 'post /:lang/user/':  'UserController.addUser',
```

##### i18n.js
```js
module.exports.i18n = {
     locales: ['en', 'es', 'fr', 'de', 'ru'],
}
```

##### localize.js  
```js
module.exports = function(req, res, next)
{
   var lang = req.param('lang'); // перехват переменной из URL
   req.setLocale(lang); // установка локализации
   next();
};
```

##### policies.js  
```js
module.exports.policies = {
  '*': true,
  '*': 'localize',
  }
```

##### index.ejs
```js
<h4> <%= __('Welcome') %> </h4>
```

## Services или Глобальные функции
* Создаем в **api/services** наш сервисес - **myService.js** 
* Там можно написать любые функции и экпоритровать их
* В любом месте можно вызвать функции из Сервиса **(myService.js)**
##### myService.js
```js
module.exports.one = {
  Summ: function(a,b){ return a + b ; }
}

module.exports.two = {
  Summ: function(a,b){ return a * b ; }
}
```

##### myController.js
```js
module.exports = {
  Index: function(req, res){ console.log(myService.one.Summ(5,2)); }
}
```

## Middleware (how to use) тут это назыв. Policies
* Создать в папке api/policies - myAuth.js
* Расскоментить в config/policies.js - '*':true; 
* И дописать там же свой контроллер и свой Middleware - 'MyController': { '*': 'myAuth' }
```javascript
// ** config/policies.js

// Работа с MIDDLEWARE такая :

  // наш Middleware на отдельный контроллер на отдельную функцию
  'BreedController': {  'Index': 'myAuth'  },

   // наш Middleware на отдельный контроллер на все функции
  'BreedController': {  '*': 'myAuth'  },

   // наш Middleware - на все контроллеры
  '*': 'myAuth' ,
```


* Также можно писать в routes.js
```javascript
 'get  /:lang':    [ {policy: 'myAuth'}, {controller:'UserController', action:'Index'}],
```


## Работа с Cookies
* примерна такая же и в Laravel
```javascript
  Index: function(req, res)
	 {   
       // syntax - res.cookie(name, value, options) 
       // options:
       // maxAge - жизнь куки в милисекундах (значение "-1" убивает куку) 
      // httpOnly - true or false or nothing
      // expires - поставить дату истечения 
      // path - '/somepath'
      // secure - true or nothing - Пометка что кука безопасна (Нафига не понятно)
      // domain - .example.com
                       
	    var date = new Date();
		  date.setDate( 7 + date.getDate()); //дни

		  res.cookie('rememberme', {dude: 'man', brick: 'shit'}, { expires: date})
      res.cookie('Uid', '52', { expires: date })
		  res.ok('Cooks were done');
		},
         
 	 Kill: function(req, res)
				 {
						res.cookie('rememberme', null, { maxAge: -1})
            res.cookie('Uid', null, { maxAge: -1})
						res.ok('Cooks were delete');
				 },        
```


## Подключени к БД
* заходим в config/connections.js - там есть секция MySQL и вводим свои данные для подключения
* заходим в config/models.js - там пишем название массива подключения к БД,
* и раскоментим строку - migrate: 'alter', это значит перестроение таблиц автоматом в соответствии с моделями:
 - 'alter' - перестроит таблицы, но при этом сохранит данные которые в них
 - 'safe'  - ничего не строит на основе моделей, надо вручную делать таблы
 - 'drop'  - убивает таблицы, и заново их строит


## Шаблонизатор
##### По желанию можно подключить любой шаблонизатор(ссылка как подключить): [Pug, Nunjucks, EJS](https://github.com/Nikeweke/EXPA--NODE/blob/master/%D0%A8%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD%D0%B8%D0%B7%D0%B0%D1%82%D0%BE%D1%80%D1%8B.md)
* комменты в шаблонах так писать - ```<%/* comment */%>```(вот это не рабочий вариант - ```<%# comment %>``` )
* Блоки, layout в EJS :

###### index.ejs
```ejs
<% layout('layout') -%>

<% script('foo.js') -%>
<% stylesheet('foo.css') -%>

<h1>I am the  template</h1>

<% block('header', "<p>I'm in the header.</p>") -%>
<% block('footer', "<p>I'm in the footer.</p>") -%>

```

###### layout.ejs
```ejs
<!DOCTYPE html>
<html>
  <head>
    <title>It's</title>
    <%-scripts%>
    <%-stylesheets%>
  </head>
  <body>
    <header>
      <%-blocks.header%>
    </header>
    <section>
      <%-body -%>
    </section>
    <footer>
      <%-blocks.footer%>
    </footer>
  </body>
</html>

```


## Маршруты (config/routes.js)
**Интересность** - можно строить маршруты 2 путями:          
1. прописывать в routes.js             
2. использовать схему в url типа - localhost/контроллер/метод действия/параметры, таким же способом можна вызывать шаблоны - такое свойство прописано в config/blueprints.js - actions = true - по ум.       
```javascript
// Например
// -> controllers/UserController.js
'Index': function(req, res)
 {
   return res.view(); // это значит что будет вызов шаблона с таким путем -> views/user/index.ejs
 }
```

* Можно по разному писать маршруты
``` javascript
module.exports.routes = {
  '/':       {  view: 'homepage' },
  '/page':   'PageController.index',
  'get /page':   'PageController.index',
  'post /page':   'PageController.index',
  'delete /page':   'PageController.index',
  '/about':  {
                controller: 'PageController',
                action: 'about'
              }
};
```




## В Продакшене
* нужно в config/blueprints.js - разкомментить и поставить false : actions, rest, shortcuts

## Request(req)
* req.acceptedLanguages // стандартные языки пользователя
* req.route             // путь маршрута
* req.headers           // заголовки
* req.protocol          // http or https, ftp , file
