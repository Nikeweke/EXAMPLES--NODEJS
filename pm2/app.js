const express  = require('express')
const app = express()


function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);
  return rand;
}


app.get('/', (req, res) => {
  const randNumber = randomInteger(1, 10) * 1000
  setTimeout(() => {
    res.status(200).send('Timeout was ' + randNumber)
  }, randNumber);
})


// Launch our app
const port = 8000
const server = app.listen(port, () => {
    console.log('Server listening on http://localhost:' + port)
})


