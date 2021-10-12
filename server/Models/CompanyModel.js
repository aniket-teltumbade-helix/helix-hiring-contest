const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CompanySchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  full_name: { type: String, required: true },
  phone_number: { type: String, required: true },
  company: { type: String, required: true },
  company_size: { type: String, required: true },
  country: { type: String, required: true },
  role: { type: String, required: true }
}, { timestamps: true })

const CompanyModel = mongoose.model('company', CompanySchema)

module.exports = CompanyModel