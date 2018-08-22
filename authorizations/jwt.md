## JWT - json web token for authetication

```js
const express = require('express')
const jwt     = require('jsonwebtoken')

const app = express()

/**
 * SET JWT
 */
app.get('/set', (req, res) => {

   let payload = {name: 'Alex', id: 26}   // not protected, can be decoded
   let secretKey = 'admin'                // protected

   let token = jwt.sign(payload, secretKey, {expiresIn: '1h'})

   let data 
   jwt.verify(token, secretKey, (err, decoded) => {
       if (err) res.send('Signature invalid')

       let result = `
       Your token: ${token}    <br />
       Data in token: ${decoded.name}  <br />
       `
       res.send(result)
   })
})


// Start app
let port = 8000
app.listen(port, () => {
  console.log('App running on ' + port + ' port');
});

```
