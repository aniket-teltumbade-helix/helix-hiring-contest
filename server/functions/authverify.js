const jwt = require('jsonwebtoken')
module.exports = authverify = (req, res, next) => {
  let token = req.headers.authorization.split(' ')[1]

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' })
  }

  jwt.verify(token, process.env.AUTH_PASS_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ err })
    }
    req.email = decoded.data
    next()
  })
}
