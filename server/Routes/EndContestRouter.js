const { startContest, endContest, contestStatus} = require('../Controllers/EndContestController')
const authverify = require('../functions/authverify')

const EndContestRouter = require('express').Router()

EndContestRouter.post('/start', authverify, startContest)
EndContestRouter.post('/end', authverify, endContest)
EndContestRouter.post('/status', authverify, contestStatus)

module.exports = EndContestRouter