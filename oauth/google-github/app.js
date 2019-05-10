const express  = require('express')
const passport = require('./passport-setup')
const app      = express()

// home
app.get('/', (req, res) => {
	res.send(`
		<h2>Welcome to our MyPassportAuthes</h2>
		<a href="/google_login">Google login</a><br><br>
		<a href="/github_login">Github login</a>
	`)
})
app.get('/fail', (req, res) => {
  res.send("Something went wrong")
})


// AUTH routes
app.use(passport.initialize())

// google-auth
app.get('/google_login', passport.authenticate('google', {
	scope: ['profile'] // запрашиваемые данные от гугла от пользователя
}))
app.get('/google_redirect', passport.authenticate('google', { failureRedirect: '/fail' }), (req, res) => {
	res.send(`
		<h3>Authed by google successfuly</h3>
		<a href="/">Get back</a>
	`)
})

// github-auth
app.get('/github_login', passport.authenticate('github', {
	scope: ['profile'] 
}))
app.get('/github_redirect', passport.authenticate('github', { failureRedirect: '/fail' }), (req, res) => {
	res.send(`
		<h3>Authed by github successfuly</h3>
		<a href="/">Get back</a>
	`)
})



// Launch our app
const port = 8000;
const server = app.listen(port, function () {
    console.log('JWT listening on port ' + port);
});
