const Rank = require('../Models/RankModel')

exports.mecontestRank = (req, res) => {
  let { contest } = req.body
  Rank.aggregate(
    [
      {
        $match: {
          contest: contest
        }
      },
      {
        $group: {
          _id: '$user',
          points: { $sum: '$score' },
          sumOfAverage: { $sum: '$percent' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          points: -1
        }
      },
      {
        $group: {
          _id: false,
          users: {
            $push: {
              user: '$_id',
              points: '$points',
              sumOfPercent: '$sumOfAverage',
              count: '$count'
            }
          }
        }
      },
      {
        $unwind: {
          path: '$users',
          includeArrayIndex: 'ranking'
        }
      },
      {
        $match: {
          'users.user': req.email
        }
      }
    ],
    (docerr, doc) => {
      if (docerr) {
        res.status(304).send({ err: 'Something went wrong!' })
      } else {
        res.status(200).send(doc)
      }
    }
  )
}
exports.contestRank = (req, res) => {
  let { contest } = req.body
  Rank.aggregate(
    [
      {
        $match: {
          contest: contest
        }
      },
      {
        $group: {
          _id: '$user',
          points: {
            $sum: '$score'
          },
          sumOfAverage: {
            $sum: '$percent'
          },
          count: {
            $sum: 1
          },
          languages: {
            $push: '$language'
          }
        }
      },
      {
        $sort: {
          points: -1
        }
      },
      {
        $group: {
          _id: false,
          users: {
            $push: {
              user: '$_id',
              points: '$points',
              sumOfPercent: '$sumOfAverage',
              count: '$count',
              languages: '$languages'
            }
          }
        }
      },
      {
        $unwind: {
          path: '$users',
          includeArrayIndex: 'ranking'
        }
      }
    ],
    (docerr, doc) => {
      if (docerr) {
        res.status(304).send({ err: 'Something went wrong!' })
      } else {
        res.status(200).send(doc)
      }
    }
  )
}

exports.challengeRank = (req, res) => {
  let { contest, challenge } = req.body
  Rank.aggregate(
    [
      {
        $match: {
          contest: contest,
          challenge: challenge
        }
      },
      {
        $sort: {
          score: -1
        }
      },
      {
        $group: {
          _id: false,
          users: {
            $push: {
              user: '$user',
              points: '$score',
              percent: '$percent',
              language: '$language'
            }
          }
        }
      },
      {
        $unwind: {
          path: '$users',
          includeArrayIndex: 'ranking'
        }
      }
    ],
    (docerr, doc) => {
      if (docerr) {
        res.status(304).send({ err: 'Something went wrong!' })
      } else {
        res.status(200).send(doc)
      }
    }
  )
}
