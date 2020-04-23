const StudentModel = require('./dbtest/StudentModel');
const MemberModel = require('./dbFamily/member/memberModel')
const ssApplyModel = require('./dbFamily/ss/ssApplyModel');

// 富查询条件，对象格式，键值对，下面为查询 name 为 lisi 的记录
const queryStudent = (obj) => {
  // { name: 'lisi' }
  return StudentModel.find(obj)
}

const queryMember = (obj) => {
  return MemberModel.find(obj)
}

const querySS = (obj) => {
  return ssApplyModel.find(obj)
}

module.exports = {
  queryStudent,
  queryMember,
  querySS
}