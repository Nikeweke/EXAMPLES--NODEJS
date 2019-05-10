const express  = require('express')
const session  = require('express-session') // server keeps session info, client keeps only token
const passport = require('./passport-setup')
const app      = express()

const sess = {
  secret: 'SecretSuper',
  cookie: {},
  resave: false,
  saveUninitialized: true
}

app.use(session(sess))
app.use(passport.initialize())

function secure (req, res, next) {
	if (req.session.user) { return next() }
  res.status(401).json({message: 'You are not authorized'});
}


// home
app.get('/', (req, res) => {
	res.send(`
		<h2>Welcome to our MyPassportAuthes</h2>
		<a href="/google_login">Google login</a><br><br>
		<a href="/github_login">Github login</a>
	`)
})

// user info (secured)
app.get('/user', [secure], (req, res) => {
	const {user}     = req.session 
	const {provider} = req.query
	let displayName
	
	if (provider === 'google') {
		displayName = user.displayName
	} else {
		displayName = user.username
	}

	res.send(`
		<h2>You are authed via ${provider}</h2>
		<h4>Your name is = ${displayName}</h4>
		${JSON.stringify(user, null, 2)} <br><br>
		<a href="/logout">Logout</a>
  `)
})

app.get('/logout', (req, res) => {
	req.session.user = '' 
	res.redirect('/')
})


// ==========================> AUTH routes
// google-auth
app.get('/google_login', passport.authenticate('google', {
	scope: ['profile'] // запрашиваемые данные от гугла от пользователя
}))

// github-auth
app.get('/github_login', passport.authenticate('github', {
	scope: ['profile'] 
}))

// custom callback for redirects
const customRedirectHandler = function (strategy) {
  return (req, res, next) => {
		passport.authenticate(strategy, (err, user, info) => {
			if (err) { return next(err) }
			if (!user) { return res.redirect('/') }
			
			req.logIn(user, (err) => {
				if (err) { return next(err) }
				req.session.user = user
				res.redirect(`/user?provider=${strategy}`)
			})
		})(req, res, next)
	}
}

app.get('/google_redirect', customRedirectHandler('google'))
app.get('/github_redirect', customRedirectHandler('github'))


// Launch our app
const port = 8000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
