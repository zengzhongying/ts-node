// StudentSchema.js file
const mongoose = require('mongoose');

let ssApplySchema = mongoose.Schema({
  time: { type: Number, required: true }
})

module.exports = ssApplySchema;