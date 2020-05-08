// MemberModel.js file
const connection = require('../../connection');
const MemberSchema = require('./memberSchema');

let MemberModel = connection("dbFamily").model('Member', MemberSchema);

module.exports = MemberModel;