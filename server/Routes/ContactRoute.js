const { addContact, viewContact } = require('../Controllers/ContactController')

var ContactRouter= require('express').Router()

ContactRouter.post('/',addContact)
ContactRouter.get('/',viewContact)

module.exports = ContactRouter