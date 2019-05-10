const keys           = require('./keys')
const passport       = require('passport')
const Auth0Strategy  = require('passport-auth0');

// Configure Passport to use Auth0
const auth0Strategy = new Auth0Strategy(
  {
    domain: keys.auth0.domain,
    clientID: keys.auth0.clientID,
    clientSecret: keys.auth0.clientSecret,
    callbackURL: 'http://localhost:8000/cb'
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    return done(null, profile);
  }
)


passport.use(auth0Strategy)


// Mandatory serializer and desearilizer fns
passport.serializeUser((user, done)   => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

module.exports = passport


