const { addContest, liveContest, upcomingContest, endedContest, contestChallenges, contestChallenge, createdbymeContest, allContests, invitaion } = require('../Controllers/ContestController')
const authverify = require('../functions/authverify')

const ContestRouter = require('express').Router()

ContestRouter.post('/add', authverify, addContest)
ContestRouter.get('/live', authverify, liveContest)
ContestRouter.get('/upcoming', authverify, upcomingContest)
ContestRouter.get('/ended', authverify, endedContest)
ContestRouter.post('/contest', authverify, contestChallenges)
ContestRouter.post('/contestchallenge', authverify, contestChallenge)
ContestRouter.post('/createdbyme', authverify, createdbymeContest)
ContestRouter.post('/all', authverify, allContests)
ContestRouter.post('/invite', authverify, invitaion)

module.exports = ContestRouter