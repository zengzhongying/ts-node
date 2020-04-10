// StudentModel.js file
const connection = require('../connection');
const StudentSchema = require('./StudentSchema');

let StudentModel = connection("dbtest").model('Student', StudentSchema);

module.exports = StudentModel;