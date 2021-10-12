const { adminRegister, adminLogin, adminProfile, requestCompPassToken, resetCompPassword } = require('../Controllers/CompanyController')

const CompanyRouter = require('express').Router()

CompanyRouter.post('/register', adminRegister)
CompanyRouter.post('/login', adminLogin)
CompanyRouter.post('/request_pass_token', requestCompPassToken)
CompanyRouter.get('/profile', authverify, adminProfile)
CompanyRouter.post('/reset_password', resetCompPassword)


module.exports = CompanyRouter

