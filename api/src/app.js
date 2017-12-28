const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())

app.post('/register', (req, res) => {
  res.send({
    message: 'User successfully registered.',
    email: req.body.email
  })
})

app.listen(process.env.PORT || 8081)
