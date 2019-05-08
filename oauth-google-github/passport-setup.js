const keys           = require('./keys')
const passport       = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const GitHubStrategy = require('passport-github')

// =============================================> Google 
const googleOptions = {
  // callbackURL - этот же путь, но абсолютный(http://localhost:8000/google_redirect) 
  // должен быть в Google console "Разрешенные URI перенаправления".
  // Это может быть и главная страница
  callbackURL : '/google_redirect', 
  clientID    : keys.google.clientID,
  clientSecret: keys.google.clientSecret
}
const googleCallback = (accessToken, refreshToken, profile, done) => {
  console.log('ACCESS TOKEN =', accessToken)
  console.log('REFRESH TOKEN =', refreshToken)
  console.log('PROFILE = ', profile)

  /*
  #  Оперировать(добавлять/искать в БД) информацией пользователя нужно здесь, 
  #  дальше инфа не идет(то есть в обработчик редиректа)  
  */

  // без вызова этой функции не идет дальше выполнение программы
  done(null, profile) 
}
passport.use(new GoogleStrategy(googleOptions, googleCallback))


// =============================================> Github
const githubOptions = {
  callbackURL: '/github_redirect',
  clientID    : keys.github.clientID,
  clientSecret: keys.github.clientSecret
}
const githubCallback = (accessToken, refreshToken, profile, done) => {
  console.log('ACCESS TOKEN =', accessToken)
  console.log('REFRESH TOKEN =', refreshToken)
  console.log('PROFILE = ', profile)
  done(null, profile) 
} 
passport.use(new GitHubStrategy(githubOptions, githubCallback))


// без реализации этой функции - выдает ошибку
passport.serializeUser((user, done) => {
  console.log('SErializaing')
  done(null, user)
})


module.exports = passport
