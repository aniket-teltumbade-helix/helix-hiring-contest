const EndContest = require("../Models/EndContestModel")
var cron = require('node-schedule');

exports.startContest = (req, res) => {
    const email = req.email
    const { name, time } = req.body
    EndContest.find({ email, name }, (err, result1) => {
        if (err) {
            res.status(400).send({ err: `SubmitErr: ${err}` })
        } else {
            if (result1.length === 0) {
                EndContest.create({ email, name, submitted: false }, (err, result) => {
                    if (err) {
                        res.status(400).send({ err: `SubmitErr: ${err}` })
                    } else {
                        console.log({time});
                        cron.scheduleJob(new Date(time), function () {
                            EndContest.findOneAndUpdate({ email, name },
                                { submitted: true },
                                {
                                    new: false,
                                    upsert: true,
                                    rawResult: true
                                }, (err, ecnst) => {
                                    if (err) {
                                        console.error('Something Went Wrong!');
                                    } else {
                                        console.info('Contest ended successfully!')
                                    }
                                })
                        })
                        res.status(200).send({ msg: 'Contest started successfully!' })
                    }
                })
            } else {
                res.status(400).send({ err: 'You have already submitted test' })
            }
        }
    })
}

exports.endContest = (req, res) => {
    const email = req.email
    const { name } = req.body
    EndContest.findOneAndUpdate({ email, name },
        { submitted: true },
        {
            new: false,
            upsert: true,
            rawResult: true
        }, (err, result) => {
            if (err) {
                res.status(400).send({ err: `SubmitErr: ${err}` })
            } else {
                res.status(200).send({ msg: 'Contest ended successfully!' })
            }
        })
}

exports.contestStatus = (req, res) => {
    const email = req.email
    const { name } = req.body
    EndContest.find({ email, name }, (err, result) => {
        if (err) {
            res.status(400).send({ err: `SubmitErr: ${err}` })
        } else {
            if (result.length > 0) {
                res.send({ msg: { status: result[0].submitted } })
            } else {
                res.send({ msg: { status: false } })
            }
        }
    })
}