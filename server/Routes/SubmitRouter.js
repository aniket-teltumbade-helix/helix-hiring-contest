const {
  submitScript,
  challengeResults,
  contestResults,
  review,
  submitMcq
} = require('../Controllers/SubmitController')
const authverify = require('../functions/authverify')

const SubmitRouter = require('express').Router()

SubmitRouter.post('/challenge_results', authverify, challengeResults)
SubmitRouter.post('/contest_results', authverify, contestResults)
SubmitRouter.post('/script', authverify, submitScript)
SubmitRouter.post('/quiz', authverify, submitMcq)
SubmitRouter.get('/review/:id', authverify, review)

module.exports = SubmitRouter
