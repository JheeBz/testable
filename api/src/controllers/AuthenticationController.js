const { User } = require('../models')

module.exports = {
  async register (req, res) {
    try {
      /**
       * @todo Hash & salt password
       */
      const user = await User.create(req.body)
      res.status(201).send(user.toJSON())
    } catch (err) {
      res.status(400).send({
        error: {
          email: 'Email address is already in use. If you have registered previously, please sign in.'
        }
      })
    }
  }
}
