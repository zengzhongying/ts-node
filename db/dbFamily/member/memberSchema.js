// MemberSchema.js file
const mongoose = require('mongoose');

let MemberSchema = mongoose.Schema({
  uid: { type: Number, required: true, index: { unique: true } },
  userName: { type: String, required: true },
  level: { type: String, required: true },
  sortNumber: { type: Number, required: true, index: { unique: true } },
  integral: { type: Number, required: true },
  isApplySS: { type: Boolean, require: true },
  password: { type: String, require: true },
  isAdmin: { type: Boolean, require: true },
  integralDetail: { type: Array, required: false }
})

module.exports = MemberSchema;