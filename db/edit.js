const StudentModel = require('./dbtest/StudentModel');
const MemberModel = require('./dbFamily/member/memberModel');
const SSApplyModel = require('./dbFamily/ss/ssApplyModel');

const editStudent = (id, obj) => {
  return StudentModel.updateOne({ _id: id }, obj)
}

const editMember = (uid, obj) => {
  return MemberModel.updateOne({ uid: uid }, obj)
}

const editSS = (_id, obj) => {
  return SSApplyModel.updateOne({ _id: _id }, obj)
}
module.exports = {
  editStudent,
  editMember,
  editSS
}