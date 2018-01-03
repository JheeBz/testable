const Joi = require('joi')

module.exports = {
  /**
   * @todo Add more detailed error messages based on different regex.
   */
  register (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,255}$')
      )
    }

    const { error } = Joi.validate(req.body, schema)
    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: {
              email: 'You must provide a valid email address. e.g. john.smith@gmail.com.'
            }
          })
          break
        case 'password':
          res.status(400).send({
            error: {
              password: 'Password must be at least 8 characters, contain 1 UPPERCASE and 1 lowercase character.'
            }
          })
          break
        default:
          /** @todo Add troubleshooting if dev ENV
           **/
          res.status(500).send({
            error: 'An unknown error occurred. Please try again in a few minutes or contact your administrator.'
          })
      }
    } else {
      next()
    }
  }
}
