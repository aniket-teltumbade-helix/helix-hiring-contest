const { addMcq, enlistMcq } = require('../Controllers/MCQController')
const authverify = require('../functions/authverify')

const MCQRouter = require('express').Router()

MCQRouter.post('/create', authverify, addMcq)
MCQRouter.get('/list', authverify, enlistMcq)

module.exports = MCQRouter