const StudentModel = require('./dbtest/StudentModel');
const MemberModel = require('./dbFamily/member/memberModel');

const editStudent = (id, obj) => {
  return StudentModel.updateOne({ _id: id }, obj)
}

const editMember = (uid, obj) => {
  return MemberModel.updateOne({ uid: uid }, obj)
}
module.exports = {
  editStudent,
  editMember
}