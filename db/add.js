const StudentModel = require('./dbtest/StudentModel');
const MemberModel = require('./dbFamily/member/memberModel');
const ssApplyModel = require('./dbFamily/ss/ssApplyModel');
const addStudent = (obj) => {
  return StudentModel.create(obj)
}
const addMember = (obj) => {
  return MemberModel.create(obj)
}
const addSS = (obj) => {
  return ssApplyModel.create(obj)
}
module.exports = {
  addStudent,
  addMember,
  addSS
}