const MCQ = require("../Models/MCQModel")

exports.addMcq = (req, res) => {
  let { email } = req
  MCQ.insertMany(req.body.mcqs.map(el => ({ ...el, createdBy: email })), (err, result) => {
    if (err) res.status(400).send(err)
    res.send(result)
  })
}

exports.enlistMcq=(req,res)=>{
  let {email}=req
  MCQ.find({createdBy: email}, (err, result) => {
    if(err) return res.status(400).send(err)
    res.send(result)
  })
}