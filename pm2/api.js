const express  = require('express')
const app = express()


app.get('/api', (req, res) => {
  res.status(200).send('ITS API mate!')
})


// Launch our app
const port = 7000
const server = app.listen(port, () => {
    console.log('Server listening on http://localhost:' + port)
})


