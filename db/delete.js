const StudentModel = require('./dbtest/StudentModel');
const MemberModel = require('./dbFamily/member/memberModel');

const delStudent = (obj) => {
  return StudentModel.deleteMany(obj)
}
const delMember = (obj) => {
  return MemberModel.deleteMany(obj)
}
module.exports = {
  delStudent,
  delMember
}