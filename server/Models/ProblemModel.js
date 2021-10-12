const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProblemSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  samples: { type: Array, required: true },
  test_cases: { type: Array, required: true },
  level: { type: String, required: true },
  points: { type: Number, default: 5 },
  languages: { type: Array, default: ['javascript', 'python', 'java'] },
  createdBy: { type: String, default: 'Anonymous' }
}, { timestamps: true })

const ProblemModel = mongoose.model('problem', ProblemSchema)

module.exports = ProblemModel