module.exports = (app) => {
  app.post('/register', (req, res) => {
    res.send({
      message: 'User successfully registered.',
      email: req.body.email
    })
  })
}
