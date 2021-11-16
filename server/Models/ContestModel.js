const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ContestSchema = new Schema({
  name: { type: String, required: true , unique: true},
  overview: { type: String, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  tagline: { type: Array, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  creator: { type: String, required: true },
  challenges: [{ type: mongoose.Types.ObjectId, ref: 'problem' }],
  mcqs:[{ type: mongoose.Types.ObjectId, ref: 'mcq' }],
  users: [{ type: mongoose.Types.ObjectId, ref:'developer'}]
}, { timestamps: true })

const ContestModel = mongoose.model('contest', ContestSchema)

module.exports = ContestModel