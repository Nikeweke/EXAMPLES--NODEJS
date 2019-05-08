
# OAuth

Более подробно [здесь](https://nikeweke.github.io/EXPA/authes/intro.html)

### Где взять clientID, clientSecret?
```js
// keys.js
// add to .gitignore

module.exports = {
  //   Взять ключи эти: 
  //    + Зайти **Google API services console**
  //    + Выбрать проект или создать (сверху слева, выпадающие меню)
  //    + Нажать кнопку "включить API и сервисы"
  //    + Ищем `"Google+ API"`
  //    + Нажимаем включить
  //    + Там будет "Идентификаторы клиентов OAuth 2.0", заходим в первый ключ и берем из него "Идентификатор клиента" и "Секрет клиента" для passport-google-auth 
  google: {
    clientID: 'XXXXXXXXXXXXXX',
    clientSecret: 'XXXXXXXXXXXXXXX'
  },

  //   1. Зайти на [сюда](https://github.com/settings/developers)
  // 2. Создать свое приложение
  // 3. Зайти в него и получить Client ID & Client Secret
  // 4. Юзать по приципу OAuth Google
  github: {
    clientID: 'XXXXXXXXXXXXXX',
    clientSecret: 'XXXXXXXXXXXXXXX'
  }
}
```
