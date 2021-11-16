const Developer = require('../Models/DeveloperModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const chalk = require('chalk')
const { uid } = require('rand-token')
const resetPassMail = require('../functions/resetPassMail')
const authpasskey = process.env.AUTH_PASS_KEY
var redis = require('redis')
var retryStrategy = require('node-redis-retry-strategy')
const { redisData } = require('../config')

var client = redis.createClient(redisData)
client.on('connect', function () {
  console.log(`Redis: ${chalk.bold.green('connected')}`)
})

exports.userRegister = (req, res) => {
  const { full_name, email, password, phone_number } = req.body
  var hashpass = bcrypt.hashSync(password, 8)
  Developer.create({ full_name, phone_number, email, password: hashpass }, (err, result) => {
    if (err) res.send({ err: `RegistrationErr: ${err}` })
    else if (result) {
      res.send({ msg: `Registration Successful!` })
    } else res.send({ err: 'Something went wrong!' })
  })
}
exports.userLogin = (req, res) => {
  const { email, password } = req.body
  Developer.findOne({ email }, (docerr, doc) => {
    if (docerr) {
      res.json({ err: docerr })
    } else if (doc === undefined || doc === null) {
      res.send({ err: 'Email not registered!' })
    } else {
      if (bcrypt.compareSync(password, doc.password)) {
        jwt.sign(
          {
            data: email
          },
          authpasskey,
          (autherr, authtoken) => {
            if (authtoken) {
              res.status(200).json({ authtoken })
            } else {
              res.json({ err: autherr })
            }
          }
        )
      } else {
        res.send({ err: "Password doesn't match" })
      }
    }
  })
}
exports.userProfile = (req, res) => {
  const email = req.email
  Developer.findOne(
    { email },
    { _id: 0, full_name: 1, email: 1 },
    (docerr, doc) => {
      if (docerr) {
        res.status(304).send({ err: 'Something went wrong!' })
      } else {
        res.status(200).send({ msg: doc })
      }
    }
  )
}
exports.requestDevPassToken = (req, res) => {
  const { email } = req.body
  Developer.findOne({ email }, (docerr, doc) => {
    console.log("doc.email", doc);
    if (doc) {
      let passtoken = uid(6)
      client.set(passtoken, doc.email, (rerr, rreply) => {
        resetPassMail(
          doc.full_name,
          doc.email,
          passtoken,
          'developer',
          req.headers.origin
        )
        res.send({
          msg: `Check Your email! Further instructions send to your email.`
        })
      })
    } else {
      res.send({ err: 'Email not registered!' })
    }
  })
}
exports.resetDevPassword = (req, res) => {
  const { password, passkey } = req.body
  client.get(passkey, (rerr, rreply) => {
    if (rerr) {
      res.send({ err: 'Expired key! Resend Email!' })
    } else {
      var hashpass = bcrypt.hashSync(password, 8)
      Developer.findOneAndUpdate(
        { email: rreply },
        { password: hashpass },
        (docerr, doc) => {
          if (docerr) {
            res.send({ err: 'Something Went wrong' })
          } else {
            res.send({ msg: 'Password changed Successfully!' })
          }
        }
      )
    }
  })
}
