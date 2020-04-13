// MemberModel.js file
const connection = require('../../connection');
const MemberSchema = require('./MemberSchema');

let MemberModel = connection("dbFamily").model('Member', MemberSchema);

module.exports = MemberModel;