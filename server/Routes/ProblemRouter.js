const { add, list, single, run, adminChallenges, compile } = require('../Controllers/ProblemController')
const authverify = require('../functions/authverify')

const ProblemRouter = require('express').Router()

ProblemRouter.get('/all', authverify, list)
ProblemRouter.post('/create', authverify, add)
ProblemRouter.get('/mychallenges', authverify, adminChallenges)
ProblemRouter.post('/run', run)
ProblemRouter.post('/compile', compile)
ProblemRouter.get('/single/:name', single)

module.exports = ProblemRouter