// StudentSchema.js file
const mongoose = require('mongoose');

let StudentSchema = mongoose.Schema({
  name: { type: String, required: true, index: { unique: true } },
  age: { type: Number, required: true }
})

module.exports = StudentSchema;