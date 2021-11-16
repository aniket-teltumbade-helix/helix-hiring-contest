const mongoose = require('mongoose')

const Schema = mongoose.Schema

const RankSchema = new Schema(
  {
    contest: { type: String, required: true },
    challenge: { type: String },
    mcq: { type: String },
    user: { type: String, required: true },
    score: { type: Number, required: true },
    percent: { type: Number, required: true },
    language: { type: String }
  },
  { timestamps: true }
)

const RankModel = mongoose.model('rank', RankSchema)

module.exports = RankModel
