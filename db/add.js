const StudentModel = require('./dbtest/StudentModel');
const MemberModel = require('./dbFamily/member/memberModel');
const addStudent = (obj) => {
  return StudentModel.create(obj)
}
const addMember = (obj) => {
  return MemberModel.create(obj)
}
module.exports = {
  addStudent,
  addMember
}