const StudentModel = require('./dbtest/StudentModel');
const MemberModel = require('./dbFamily/member/memberModel');
const ssApplyModel = require('./dbFamily/ss/ssApplyModel');

const delStudent = (obj) => {
  return StudentModel.deleteMany(obj)
}
const delMember = (obj) => {
  return MemberModel.deleteMany(obj)
}

const delSS = (obj) => {
  return ssApplyModel.deleteMany(obj)
}
module.exports = {
  delStudent,
  delMember,
  delSS
}