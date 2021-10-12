const mongoose = require('mongoose')

const Schema = mongoose.Schema

const SubmitSchema = new Schema(
  {
    contest: { type: String, required: true },
    challenge: { type: String, required: true },
    user: { type: String, required: true },
    score: { type: Number, required: true },
    status: { type: String, required: true },
    test_result: { type: Array, required: true },
    code: { type: String, require: true },
    language: { type: String, require: true }
  },
  { timestamps: true }
)

const SubmitModel = mongoose.model('submit', SubmitSchema)

module.exports = SubmitModel
