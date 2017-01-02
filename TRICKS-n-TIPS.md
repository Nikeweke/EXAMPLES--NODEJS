## REPL mode
Чтобы войти в REPL - надо набрать **node** и нажать **Ентер** - когда появиться угловая стрелка (>) , это и есть REPL
В этом режиме можно набирать код как и текстовом редакторе. 

###### Kомmанды:
*  .exit - выход из REPL
*   .save - сохранить текущий сеанс
*   .load - загрузить сеанс
*   .help 

---

## NPM - Интересные пакеты
* **Colors** - для вывода текста в консоль разными цветами
* **Optimist** - перехватчик ключей с консоли
* **CrossRoads** - маршрутизатор
* **http-proxy** - Самым простым использованием есть создание автономного прокси-сервера,которий слушает входящие запросы на одном порту и перенапрвляет их веб-серверу, слушающему другой порт
* **Pug** - шаблонизатор (Jade)
* **Nunjucks** - шаблонизатор похож на Blade(Laravel) 
* **Stylus** - шаблонизатор для CSS-стилей как Pug(Jade)
* **node-validator** - проверка данных на валидность(почта и т.д.)
* **Forever** - Перезапускает приложение после падения 
* **Faker** - генерация фальшывих имен и т.д.
* **Formidable** - для загрузки файлов(картинок)
* **Busboy** - для загрузки файлов(картинок)

##### Forever 
```cmd
// cmd
forever start -a -l forever.log -o out.log -e err.log app.js
```

 
##### Colors
```js
var colors = require('colors');  // colors
console.log('RAINBOW SIX XSIEGE'.rainbow);  // colorize it
console.log('ABRA_CADABRA'.zebra);      // colorize it
``` 

##### Optimist
```js
var argv = require('optimist').argv;  // optimist
console.log(argv.o + " - " + argv.t);  // when start app - type : node app -o 2 -t 4
console.log(argv.one + argv.two);      // when start app - type : node app --one 2 --two 4
```
