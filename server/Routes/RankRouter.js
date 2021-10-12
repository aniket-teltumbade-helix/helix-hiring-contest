const { challengeRank, contestRank, mecontestRank } = require('../Controllers/RankController')

const authverify = require('../functions/authverify')

const RankRouter = require('express').Router()

RankRouter.post('/challenge_rank', challengeRank)
RankRouter.post('/contest_rank', contestRank)
RankRouter.post('/me_contest_rank', authverify, mecontestRank)

module.exports = RankRouter