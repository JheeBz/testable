const { User } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7

  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      const userJson = user.toJSON()
      res.status(201).send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(400).send({
        error: {
          email: 'Email address is already in use. If you have registered previously, please sign in.'
        }
      })
    }
  },
  async login (req, res) {
    try {
      const {email, password} = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })

      const isPasswordValid = await user.comparePassword(password)
      if (!user || !isPasswordValid) {
        return res.status(401).send({
          error: 'The email address or password was incorrect.'
        })
      }

      const userJson = user.toJSON()
      res.status(201).send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      return res.status(500).send({
        error: 'An error has occured trying to log in. Please try again in a bit.'
      })
    }
  }
}
