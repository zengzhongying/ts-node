const StudentModel = require('./dbtest/StudentModel');
const addStudent = (obj) => {
  return StudentModel.create(obj)
}
module.exports = {
  addStudent
}