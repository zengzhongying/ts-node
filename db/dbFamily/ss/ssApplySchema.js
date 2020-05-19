// StudentSchema.js file
const mongoose = require('mongoose');

let ssApplySchema = mongoose.Schema({
  time: { type: String, required: true },
  boss: { type: String, required: true },
  leader: { type: Object, required: true },
  member: { type: Array, require: true }
})

module.exports = ssApplySchema;