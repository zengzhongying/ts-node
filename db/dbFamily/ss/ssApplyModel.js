// MemberModel.js file
const connection = require('../../connection');
const ssApplySchema = require('./ssApplySchema');

let ssApplyModel = connection("dbFamily").model('SS', ssApplySchema);

module.exports = ssApplyModel;