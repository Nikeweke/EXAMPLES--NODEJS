const keys           = require('./keys')
const passport       = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const GitHubStrategy = require('passport-github')

// Google 
const googleStrategy = new GoogleStrategy(
  {
    // callbackURL - этот же путь, но абсолютный(http://localhost:8000/google_redirect) 
    // должен быть в Google console "Разрешенные URI перенаправления".
    // Это может быть и главная страница
    callbackURL : '/google_redirect', 
    clientID    : keys.google.clientID,
    clientSecret: keys.google.clientSecret
  }, 
  function (accessToken, refreshToken, profile, done) {
    // без вызова этой функции не идет дальше выполнение программы
    return done(null, profile) 
  }
)


// Github
const gitHubStrategy = new GitHubStrategy(
  {
    callbackURL: '/github_redirect',
    clientID    : keys.github.clientID,
    clientSecret: keys.github.clientSecret
  },
  function (accessToken, refreshToken, profile, done) {
    return done(null, profile) 
  }
)


passport.use(googleStrategy)
passport.use(gitHubStrategy)


// без реализации этой функции - выдает ошибку
passport.serializeUser((user, done) => {
  console.log('SErializaing')
  done(null, user)
})


module.exports = passport
