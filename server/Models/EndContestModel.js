const mongoose = require('mongoose')

const Schema = mongoose.Schema

const EndContestSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  submitted: { type: Boolean, required: true}
}, { timestamps: true })

const EndContestModel = mongoose.model('endcontest', EndContestSchema)

module.exports = EndContestModel