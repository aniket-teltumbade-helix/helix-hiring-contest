const { challengeRank, contestRank, mecontestRank, solvedChallenges, solvedMcqs } = require('../Controllers/RankController')

const authverify = require('../functions/authverify')

const RankRouter = require('express').Router()

RankRouter.post('/challenge_rank', challengeRank)
RankRouter.post('/contest_rank', contestRank)
RankRouter.post('/me_contest_rank', authverify, mecontestRank)
RankRouter.post('/solved/challenges', authverify, solvedChallenges)
RankRouter.post('/solved/mcqs', authverify, solvedMcqs)

module.exports = RankRouter