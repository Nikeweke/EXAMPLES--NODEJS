# Strapi

### Content-type 
Это данные из таблицы или колекции которые подвязаны к данным из БД

### Single-type
Это просто объект, не привязанный ни к какой таблице - в основном настройки, доступны все те же операции как и к Content-type. 

### Component
Это несколько типов для одного поля - то есть можно делать вложенные типы в одно поле: допустим есть amount_type, amount. Можно сделать price: type, amount

### Окружения "dev" или "development"?
у страпи нет окружения "dev" - "development". Так что когда указываешь в `.env` файле **NODE_ENV=dev** кнопка добавить контент-тайп может пропасть

### JWT авторизация
Есть публичные и приватные(закрытые) API к которым нужно обращаться только с JWToken. Strapi уже имеет маршруты для регистрации и авторизации

###### Registration(local)
```js
// https://strapi.io/documentation/v3.x/plugins/users-permissions.html#jwt-configuration
axios
  .post('http://localhost:1337/auth/local/register', {
    username: 'Strapi user',
    email: 'user@strapi.io',
    password: 'strapiPassword',
  })
  // returns some info and JWT
  .then(response => {
    // Handle success.
    console.log('Well done!');
    console.log('User profile', response.data.user);
    console.log('User token', response.data.jwt);
  })
  .catch(error => {
    // Handle error.
    console.log('An error occurred:', error.response);
  });
```

###### Login(local)
```js
axios
  .post('http://localhost:1337/auth/local', {
    identifier: 'user@strapi.io',
    password: 'strapiPassword',
  })
  .then(response => {
    // Handle success.
    console.log('Well done!');
    console.log('User profile', response.data.user);
    console.log('User token', response.data.jwt);
  })
  .catch(error => {
    // Handle error.
    console.log('An error occurred:', error.response);
  });
```

### Providers 
Это провайдеры авторизации - все регулируеться через страпи. (Plugins > Roles & Permissions > Tab "Providers")

### Extensions for plugin
> https://strapi.io/documentation/v3.x/plugins/users-permissions.html#adding-a-new-provider-to-your-project
Можно переписывать стандартную логику плагинов. Для этого надо копировать файлы из node_modules. И потом можно менять. 


### Relational fields
Создавая записи для таблиц можно указать поля(отношения) по которым можно подвязать с другой таблицы - Поле "relation" указывает на соеденение с другой таблицой. При отдаче данных по API привязанные данные будут в записи.
