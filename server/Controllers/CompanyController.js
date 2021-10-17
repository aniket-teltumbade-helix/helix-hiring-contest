const Company = require('../Models/CompanyModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authpasskey = process.env.AUTH_PASS_KEY
var redis = require('redis')
var retryStrategy = require('node-redis-retry-strategy')
const chalk = require('chalk')
const { redisData } = require('../config')
const resetPassMail = require('../functions/mail/resetPassMail')

var client = redis.createClient(redisData)
client.on('connect', function () {
  console.log(`Redis: ${chalk.bold.green('connected')}`)
})
exports.adminRegister = (req, res) => {
  const {
    email,
    password,
    full_name,
    phone_number,
    company,
    company_size,
    country,
    role
  } = req.body
  let hashpass = bcrypt.hashSync(password, 8)
  Company.create(
    {
      email,
      password: hashpass,
      full_name,
      phone_number,
      company,
      company_size,
      country,
      role
    },
    (err, result) => {
      if (err) {
        res.send({ err: `RegistrationErr: ${err}` })
      } else if (result) {
        res.send({ msg: `Registration Successful!` })
      } else {
        res.send({ err: 'Something went wrong!' })
      }
    }
  )
}

exports.adminLogin = (req, res) => {
  const { email, password } = req.body
  Company.findOne({ email }, (docerr, doc) => {
    if (docerr) {
      res.json({ err: docerr })
    } else if (doc === undefined || doc === null) {
      res.send({ msg: 'Email not registered!' })
    } else {
      if (bcrypt.compareSync(password, doc.password)) {
        jwt.sign(
          {
            data: email
          },
          authpasskey,
          (autherr, authtoken) => {
            if (autherr) {
              res.json({ err: autherr })
            } else if (authtoken) {
              res.status(200).json({ authtoken })
            }
          }
        )
      } else {
        res.send({ msg: "Password doesn't match" })
      }
    }
  })
}
exports.adminProfile = (req, res) => {
  const email = req.email
  Company.findOne(
    { email },
    {
      _id: 0,
      full_name: 1,
      email: 1,
      phone_number: 1,
      company: 1,
      company_size: 1,
      country: 1,
      role: 1
    },
    (docerr, doc) => {
      if (docerr) {
        res.status(304).send({ err: 'Something went wrong!' })
      } else {
        res.status(200).send({ msg: doc })
      }
    }
  )
}

exports.requestCompPassToken = (req, res) => {
  const { email } = req.body
  Company.findOne({ email }, (docerr, doc) => {
    if (doc) {
      let passtoken = uid(6)
      client.hset(passtoken, doc.email, (rerr, rreply) => {
        resetPassMail(
          doc.full_name,
          doc.email,
          passtoken,
          'company',
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

exports.resetCompPassword = (req, res) => {
  const { password, passkey } = req.body
  client.get(passkey, (rerr, rreply) => {
    if (rerr) {
      res.send({ msg: 'Expired key! Resend Email!' })
    } else {
      var hashpass = bcrypt.hashSync(password, 8)
      Company.findOneAndUpdate(
        { email: rreply },
        { password: hashpass },
        (docerr, doc) => {
          if (docerr) {
            res.send('Something Went wrong')
          } else {
            res.send({ msg: 'Password changed Successfully!' })
          }
        }
      )
    }
  })
}
