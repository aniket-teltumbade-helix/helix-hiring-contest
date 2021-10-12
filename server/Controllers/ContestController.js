const mongoose = require('mongoose')
const Contest = require('../Models/ContestModel')
const Problem = require('../Models/ProblemModel')

exports.addContest = (req, res) => {
  const {
    name,
    overview,
    start_date,
    end_date,
    tagline,
    description,
    challenges
  } = req.body
  const creator = req.email
  Contest.create(
    {
      name,
      overview,
      start_date,
      end_date,
      tagline,
      description,
      challenges,
      creator
    },
    (err, result) => {
      if (err) res.status(501).send({ err: `SavingContestErr: ${err}` })
      else if (result) {
        res.status(200).send({ msg: `Contest Saving Successful!` })
      } else res.status(502).send({ msg: 'Something went wrong!' })
    }
  )
}

exports.liveContest = (req, res) => {
  Contest.aggregate(
    [
      {
        $match: {
          start_date: {
            $lt: new Date()
          },
          end_date: {
            $gte: new Date()
          }
        }
      }
    ],
    (docerr, doc) => {
      if (docerr) {
        res.status(422).send({ msg: `QueryProcessingErr:${docerr}` })
      } else {
        res.status(200).send(doc)
      }
    }
  )
}

exports.upcomingContest = (req, res) => {
  Contest.aggregate(
    [
      {
        $match: {
          start_date: {
            $gt: new Date()
          }
        }
      }
    ],
    (docerr, doc) => {
      if (docerr) {
        res.status(422).send({ msg: `QueryProcessingErr:${docerr}` })
      } else {
        res.status(200).send(doc)
      }
    }
  )
}

exports.endedContest = (req, res) => {
  Contest.aggregate(
    [
      {
        $match: {
          end_date: {
            $lt: new Date()
          }
        }
      }
    ],
    (docerr, doc) => {
      if (docerr) {
        res.status(422).send({ msg: `QueryProcessingErr:${docerr}` })
      } else {
        res.status(200).send(doc)
      }
    }
  )
}

exports.contestChallenges = (req, res) => {
  //res.send(req.body)
  Contest.find(
    req.body,
    { name: 1, start_date: 1, end_date: 1, creator: 1, challenges: 1 },
    (cdocerr, cdoc) => {
      if (cdocerr) {
        res.status(422).send({ msg: `QueryProcessingErr:${cdocerr}` })
      } else {
        Problem.aggregate(
          [
            {
              $match: {
                _id: {
                  $in: cdoc[0].challenges
                }
              }
            }
          ],
          (pdocerr, pdoc) => {
            if (pdocerr) {
              res.status(422).send({ msg: `QueryProcessingErr:${pdocerr}` })
            } else {
              var status =
                cdoc[0].start_date < new Date() && cdoc[0].end_date > new Date()
                  ? 'Live'
                  : cdoc[0].start_date > new Date()
                  ? 'Upcoming'
                  : 'Ended'
              res
                .status(200)
                .send({
                  challenges: pdoc,
                  name: cdoc[0].name,
                  data: cdoc[0],
                  status
                })
            }
          }
        )
      }
    }
  )
}
exports.contestChallenge = (req, res) => {
  const { name, challenge } = req.body
  Problem.findOne({ name: challenge }, (pdocerr, pdoc) => {
    if (pdocerr) {
      res.status(422).send({ msg: `QueryProcessingErr:${pdocerr}` })
    } else if (pdoc === null) {
      res
        .status(400)
        .send({ err: 'Bad Request - Problem is not present in database.' })
    } else {
      Contest.aggregate(
        [
          {
            $match: {
              challenges: {
                $in: [pdoc._id]
              }
            }
          },
          {
            $project: {
              name: 1,
              _id: 0
            }
          }
        ],
        (cdocerr, cdoc) => {
          if (cdocerr) {
            res.status(422).send({ msg: `QueryProcessingErr:${pdocerr}` })
          } else {
            if (cdoc.some(el => el.name === name)) {
              res.status(200).send(pdoc)
            } else {
              res
                .status(400)
                .send({
                  err: 'Bad Request - problem is not associated with contest.'
                })
            }
          }
        }
      )
    }
  })
}
exports.createdbymeContest = (req, res) => {
  let { email } = req
  Contest.find({ creator: email }, (cdocerr, cdoc) => {
    if (cdocerr) {
      res.status(422).send({ msg: `QueryProcessingErr:${cdocerr}` })
    } else {
      res.status(200).send(cdoc)
    }
  })
}
exports.allContests = (req, res) => {
  let { email } = req
  Contest.find({}, (cdocerr, cdoc) => {
    if (cdocerr) {
      res.status(422).send({ msg: `QueryProcessingErr:${cdocerr}` })
    } else {
      res.status(200).send(cdoc)
    }
  })
}
