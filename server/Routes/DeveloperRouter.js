const { userRegister, userLogin, userProfile, requestDevPassToken, resetDevPassword } = require('../Controllers/DeveloperController')
const authverify = require('../functions/authverify')


const DeveloperRouter = require('express').Router()

DeveloperRouter.post('/register', userRegister)
DeveloperRouter.post('/login', userLogin)
DeveloperRouter.post('/request_pass_token', requestDevPassToken)
DeveloperRouter.post('/reset_password', resetDevPassword)
DeveloperRouter.get('/profile', authverify, userProfile)

module.exports = DeveloperRouter