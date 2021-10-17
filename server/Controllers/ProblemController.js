const Problem = require('../Models/ProblemModel')
var tmp = require('tmp')
var fs = require('fs')
const path = require('path')
const os = require('os')
const scriptExecutor = require('../functions/scripts/scriptExecutor')
const javaExecutor = require('../functions/scripts/scriptJavaExecutor')
const cExecutor = require('../functions/scripts/scriptCExecutor')
const cppExecutor = require('../functions/scripts/scriptCppExecutor')

exports.add = (req, res) => {
  let { email } = req
  Problem.create({ ...req.body, createdBy: email }, (err, result) => {
    if (err) res.send(err)
    res.send(result)
  })
}
exports.list = (req, res) => {
  let limit = req.query.page ? parseInt(req.query.page) * 10 + 10 : 10
  let skip = req.query.page ? parseInt(req.query.page) * 10 : 0
  Problem.find()
    .skip(skip)
    .limit(limit)
    .exec((err, result) => {
      if (err) res.send(err)
      res.send(result)
    })
}

exports.adminChallenges = (req, res) => {
  Problem.find({ createdBy: req.email }, (err, result) => {
    if (err) res.status(500).send(err)
    else res.status(200).send(result)
  })
}

exports.single = (req, res) => {
  let { name } = req.params
  Problem.findOne({ name }, (err, result) => {
    if (err) res.send(err)
    res.send(result)
  })
}
exports.run = (req, res) => {
  let { language, code, samples } = req.body
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
  var output = new Array()
  var output_error = ''
  var passed = 0
  var failed = samples.length
  if (
    language === 'python' ||
    language === 'javascript' ||
    language === 'php'
  ) {
    tmp.file({ prefix: 'projectA-', postfix: ext, keep: true }, function (
      ferr,
      path,
      fd,
      cleanupCallback
    ) {
      if (ferr) {
        res.status(400).send({ msg: `FileCreationErr: ${ferr}` })
      } else {
        fs.writeFileSync(path, code)
        for (i = 0; i < samples.length; i++) {
          let response = scriptExecutor(command, path, samples[i].input)
          if (response.message) {
            let status = response.message === samples[i].output
            if (status) {
              passed++
              failed--
            }
            response = {
              ...response,
              status,
              input: samples[i].input,
              expected: samples[i].output,
              output: response.message
            }
            output.push(response)
          } else {
            output_error = response.error
          }
        }
        if (output_error != '') {
          //let msg1 = output_error.split(path.substring(0, path.length - 3)).join("Solution");
          res.send({ error: output_error })
        } else {
          res.send({ output, passed, failed })
        }
      }
      cleanupCallback()
    })
  } else {
    let r = (Math.random() + 1).toString(36).substring(2)
    fs.mkdirSync(path.join(os.tmpdir(), r))
    if (language === 'java') {
      fs.writeFileSync(path.join(os.tmpdir(), r, 'Solution.java'), code)
    } else if (language === 'c') {
      fs.writeFileSync(path.join(os.tmpdir(), r, 'Solution.c'), code)
    } else if (language === 'cpp') {
      fs.writeFileSync(path.join(os.tmpdir(), r, 'Solution.cpp'), code)
    }

    samples.forEach(el => {
      let response
      if (language === 'java') {
        response = javaExecutor(el.input, r)
      } else if (language === 'c') {
        response = cExecutor(el.input, path.join(os.tmpdir(), r, 'Solution'))
      } else if (language === 'cpp') {
        response = cppExecutor(el.input, path.join(os.tmpdir(), r, 'Solution'))
      }
      if (response.message) {
        let status = response.message.trim() === el.output.trim()
        // test_result.push(output_status)
        if (status) {
          passed++
          failed--
        }
        response = {
          ...response,
          status,
          input: el.input,
          expected: el.output,
          output: response.message
        }
        output.push(response)
      } else {
        output_error = response.error
      }
    })

    if (output_error != '') {
      //let msg1 = output_error.split(path.substring(0, path.length - 3)).join("Solution");
      res.send({ error: output_error })
    } else {
      res.send({ output, passed, failed })
    }
  }
}
exports.compile = (req, res) => {
  let { language, code, input } = req.body
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
  if (
    (language == 'python') | (language === 'javascript') ||
    language === 'php'
  ) {
    tmp.file({ prefix: 'projectA-', postfix: ext, keep: true }, function (
      ferr,
      path,
      fd,
      cleanupCallback
    ) {
      if (ferr) {
        res.status(400).send({ msg: `FileCreationErr: ${ferr}` })
      } else {
        fs.writeFileSync(path, code)
        let response = scriptExecutor(command, path, input)
        res.send(response)
      }
      cleanupCallback()
    })
  } else {
    let r = (Math.random() + 1).toString(36).substring(2)
    fs.mkdirSync(path.join(os.tmpdir(), r))
    let data
    if (language === 'java') {
      fs.writeFileSync(path.join(os.tmpdir(), r, 'Solution.java'), code)
      data = javaExecutor(input, r)
      return res.send(data)
    } else if (language === 'c') {
      fs.writeFileSync(path.join(os.tmpdir(), r, 'Solution.c'), code)
      data = cExecutor(input, path.join(os.tmpdir(), r, 'Solution'))
      return res.send(data)
    } else if (language === 'cpp') {
      fs.writeFileSync(path.join(os.tmpdir(), r, 'Solution.cpp'), code)
      data = cppExecutor(input, path.join(os.tmpdir(), r, 'Solution'))
      return res.send(data)
    }
  }
}
