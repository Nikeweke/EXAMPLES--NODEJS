const express  = require('express')
const session  = require('express-session') // server keeps session info, client keeps only token
const passport = require('./passport-setup')

const app = express()

// config express-session
const sess = {
  secret: 'SecretSuper',
  cookie: {},
  resave: false,
  saveUninitialized: true
}
if (app.get('env') === 'production') {
  sess.cookie.secure = true // serve secure cookies, requires https
}

app.use(session(sess))
app.use(passport.initialize())
app.use(passport.session())

// Middleware secure
function secured (req, res, next) {
  if (req.user) { return next() }
  req.session.returnTo = req.originalUrl;
  res.status(401).json({message: 'You are not authorized'});
}


// Routes
// Home
app.get('/', (req, res) => {
	res.send(`
		<h2>Welcome to our Auth0 authenctication</h2>
		<a href="/auth0_login">Auth0 login</a><br><br>
	`)
})

// User profile (available after auth, secured with middleware)
app.get('/user', [secured], (req, res, next) => {
  const { _raw, _json, ...userProfile } = req.user
  res.send(`
    <h2>You are authed</h2>
    <h4>Your name is = ${userProfile.displayName}</h4>
    ${JSON.stringify(userProfile, null, 2)} <br><br>
    <a href="/logout">Logout</a>
  `)
})


// Logout
app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})


// Auth0 - Login
app.get('/auth0_login', passport.authenticate('auth0', {
  scope: 'openid email profile'
}), function (req, res) {
  res.redirect('/');
});

// Auth0 - callback
app.get('/cb', (req, res, next) => {
  passport.authenticate('auth0', (err, user, info) => {
    if (err) { return next(err) }

    if (!user) { return res.redirect('/') }
    
    req.logIn(user, (err) => {
      if (err) { return next(err) }
      const returnTo = req.session.returnTo
      delete req.session.returnTo
      res.redirect(returnTo || '/user')
    })
  })(req, res, next)
})


// Launch our app
const port = 8000
const server = app.listen(port, function () {
    console.log('Server listening on http://localhost:' + port)
})
