const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MCQSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    options: { type: Array, required: true },
    level: { type: String, default: "Beginner", required: false },
    points: { type: Number, default: 1, required: false },
    createdBy: { type: String, default: 'Anonymous', required: false }
}, { timestamps: true })

const MCQModel = mongoose.model('mcq', MCQSchema)

module.exports = MCQModel