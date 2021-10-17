var tmp = require('tmp')
var fs = require('fs')
const Submit = require('../Models/SubmitModel')
const Rank = require('../Models/RankModel')
const path = require('path')
const os = require('os')
const scriptExecutor = require('../functions/scripts/scriptExecutor')
const javaExecutor = require('../functions/scripts/scriptJavaExecutor')
const cExecutor = require('../functions/scripts/scriptCExecutor')
const cppExecutor = require('../functions/scripts/scriptCppExecutor')
const mongoose = require('mongoose')

exports.submitScript = (req, res) => {
  let user = req.email
  let { language, script, contest, challenge, test_cases, points } = req.body
  let ext =
    language === 'python'
      ? '.py'
      : language === 'javascript'
      ? '.js'
      : language === 'php'
      ? '.php'
      : null
  let command =
    language === 'python'
      ? 'python3'
      : language === 'javascript'
      ? 'node'
      : language === 'php'
      ? 'php'
      : null
  if (language === 'python' || language == 'javascript' || language === 'php') {
    tmp.file({ prefix: 'projectA-', postfix: ext, keep: true }, function (
      ferr,
      path,
      fd,
      cleanupCallback
    ) {
      var passed = 0
      var test_result = new Array()
      if (ferr) {
        cleanupCallback()
        res.status(400).send({ msg: `FileCreationErr: ${ferr}` })
      } else {
        fs.writeFileSync(path, script)
        for (i = 0; i < test_cases.length; i++) {
          let response = scriptExecutor(command, path, test_cases[i].input)
          if (response.message) {
            let output_status = response.message === test_cases[i].output
            test_result.push(output_status)
            if (output_status) {
              passed++
            }
          } else {
            test_result.push(false)
          }
        }
        let chances = passed / test_cases.length
        let percent = chances * 100
        let score = points * chances
        let status = score === points ? 'Accepted' : 'Wrong Answer'
        cleanupCallback()
        Submit.create(
          {
            contest,
            challenge,
            user,
            score,
            status,
            test_result,
            code: script,
            language
          },
          (sdocerr, sdoc) => {
            if (sdocerr) {
              res.status(400).send({ msg: `SubmitErr: ${sdocerr}` })
            } else {
              Rank.findOneAndUpdate(
                { contest, challenge, user },
                { score, percent, language },
                {
                  new: true,
                  upsert: true,
                  rawResult: true
                },
                (rdocerr, rdoc) => {
                  if (rdocerr) {
                    res.status(400).send({ msg: `RankErr: ${rdocerr}` })
                  } else {
                    res.status(200).send({ Rank: rdoc, Submit: sdoc })
                  }
                }
              )
            }
          }
        )
      }
    })
  } else {
    var passed = 0
    var test_result = new Array()
    let r = (Math.random() + 1).toString(36).substring(2)
    fs.mkdirSync(path.join(os.tmpdir(), r))
    switch (language) {
      case 'java':
        fs.writeFileSync(path.join(os.tmpdir(), r, 'Solution.java'), script)
        break

      case 'c':
        fs.writeFileSync(path.join(os.tmpdir(), r, 'Solution.c'), script)
        break

      case 'cpp':
        fs.writeFileSync(path.join(os.tmpdir(), r, 'Solution.cpp'), script)
        break

      default:
        break
    }

    test_cases.forEach(el => {
      let data
      switch (language) {
        case 'java':
          data = javaExecutor(el.input, r)
          break
        case 'c':
          data = cExecutor(el.input, r)
          break
        case 'cpp':
          data = cppExecutor(el.input, r)
          break

        default:
          break
      }
      if (data.message) {
        let output_status = data.message.trim() === el.output.trim()
        test_result.push(output_status)
        if (output_status) {
          passed++
        }
      } else {
        test_result.push(false)
      }
    })
    let chances = passed / test_cases.length
    let percent = chances * 100
    let score = points * chances
    let status = score === points ? 'Accepted' : 'Wrong Answer'
    Submit.create(
      {
        contest,
        challenge,
        user,
        score,
        status,
        test_result,
        code: script,
        language
      },
      (sdocerr, sdoc) => {
        if (sdocerr) {
          res.status(400).send({ msg: `SubmitErr: ${sdocerr}` })
        } else {
          Rank.findOneAndUpdate(
            { contest, challenge, user },
            { score, percent, language },
            {
              new: true,
              upsert: true,
              rawResult: true
            },
            (rdocerr, rdoc) => {
              if (rdocerr) {
                res.status(400).send({ msg: `RankErr: ${rdocerr}` })
              } else {
                res.status(200).send({ Rank: rdoc, Submit: sdoc })
              }
            }
          )
        }
      }
    )
  }
}

exports.challengeResults = (req, res) => {
  let user = req.email
  let { contest, challenge } = req.body
  Submit.find({ contest, challenge, user }, (err, result) => {
    if (err) {
      res.status(400).send({ msg: `SubmitErr: ${err}` })
    } else {
      res.status(200).send(result)
    }
  })
}
exports.contestResults = (req, res) => {
  let user = req.email
  let { contest } = req.body
  Submit.find({ contest, user }, (err, result) => {
    if (err) {
      res.status(400).send({ msg: `SubmitErr: ${err}` })
    } else {
      res.status(200).send(result)
    }
  })
}
exports.review = (req, res) => {
  let { id } = req.params
  Submit.findById({ _id: mongoose.Types.ObjectId(id) }, (err, result) => {
    if (err) {
      res.status(400).send({ msg: `SubmitErr: ${err}` })
    } else {
      res.status(200).send(result)
    }
  })
}
