const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ContactSchema = new Schema({
  full_name: { type: String, required: true },
  email: { type: String, required: true },
  mobile_no: { type: String, required: true },
  flag:{type:Boolean, default: false}
}, { timestamps: true })

const ContactModel = mongoose.model('contact', ContactSchema)
module.exports = ContactModel