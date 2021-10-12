const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ContestSchema = new Schema({
  _companyid: { type: mongoose.Types.ObjectId, required: true, ref: 'company' },
  name: { type: String, required: true },
  overview: { type: String, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  tagline: { type: Array, required: true },
  description: { type: String, required: true },
  challenges: [{ type: mongoose.Types.ObjectId, ref: 'problem' }]
}, { timestamps: true })

const ContestModel = mongoose.model('contest', ContestSchema)

module.exports = ContestModel