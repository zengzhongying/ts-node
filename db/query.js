const StudentModel = require('./dbtest/StudentModel');

// 富查询条件，对象格式，键值对，下面为查询 name 为 lisi 的记录
const queryStudent = (obj) => {
  // { name: 'lisi' }
  return StudentModel.find(obj)
}

module.exports = {
  queryStudent
}