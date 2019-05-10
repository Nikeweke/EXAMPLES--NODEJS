
# OAuth

Более подробно и скринами [здесь](https://nikeweke.github.io/EXPA/authes/intro.html)

### Где взять clientID, clientSecret?
#### Google
1. Зайти **Google API services console**
2. Выбрать проект или создать (сверху слева, выпадающие меню)
3. Нажать кнопку "включить API и сервисы"
4. Ищем `"Google+ API"`
5. Нажимаем включить
6. Там будет "Идентификаторы клиентов OAuth 2.0", заходим в первый ключ и берем из него "Идентификатор клиента" и "Секрет клиента" для passport-google-auth 

#### Github
1. Зайти [сюда](https:ithub.com/settings/developers)
2. Создать свое приложение
3. Зайти в него и получить Client ID & Client Secret
4. Юзать по приципу OAuth Google
