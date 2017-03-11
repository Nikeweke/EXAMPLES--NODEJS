## Шаблонизаторы
#### и их покдючение в Sails.js
* **Pug(Jade)** - удобный для быстрого верстания страницы, но только если страница простая 
* **Nunjucks(Blade)** - практичный как Blade из Laravel
* **EJS** - стандартный для Sails шаблонизатор

---


#### EJS (.ejs)
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
  <%/* Comment */%>
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

---

#### Nunjucks (.njk)

###### config/views.js
```js
engine: {
          ext: 'njk',
          fn: function (str, options, fn) {
              var engine = require('nunjucks');
                  engine.configure('views', {
                    autoescape       : true,
                    throwOnUndefined : true,
                    trimBlocks       : true,
                    lstripBlocks     : true,
                    express          : sails.hooks.http.app,
                    watch            : true,
                    noCache          : false,
                    web              : {
                          useCache : true,
                          async    : false
                    }
              });
              engine.render(str, options, fn);
          }
      },
```

###### index.njk
```nunjucks
{% extends 'layout.njk' %}
    {% block content %}
         <h2>Hello {{ Hello }}</h2>
    {% endblock %}
```

###### layout.njk
```nunjucks
<!DOCTYPE html>

{# Comment #}
{% include "elem/styles.njk" %}

<html>
    <body>
          {% block content %}{% endblock %}
    </body>
</html>
```

---

#### Pug (.pug)

###### config/views.js
```js
engine: 'pug',
```

###### index.pug
```pug
extends layout

block content
    div.w3-container.w3-content.w3-indigo
        //- title - это переменная дана из котроллера
        h1= title
        p Welcome to #{shit}
block footer
    div.w3-container.w3-content.w3-lime
        h2 I am footer
```
###### layout.pug
```pug
doctype html
html(lang="en")
    head
        //- title - это переменная дана из котроллера
        title= title
        link(rel='stylesheet', href='assets/css/w3.css')
        
    body.w3-pale-green
        block content
        block footer
        
        include elem/javascript.pug
  ```
  
###### javascript.pug
```pug
// JQUERY
script(src='https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js')   
// ANGULAR-JS
script(src='https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js') 
// MA-JS
script(src='assets/js/main.js')                                                    
  ```


