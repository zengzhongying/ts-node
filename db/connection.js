const mongoose = require('mongoose');

//封裝  可以連接各個數據庫
const connFunction = function (dbName) {
  const conn = mongoose.createConnection(
    `mongodb://127.0.0.1:27017/${dbName}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  conn.on('open', () => {
    console.log('打开 mongodb 连接');
  })
  conn.on('err', (err) => {
    console.log('err:' + err);
  })
  return conn;
}

module.exports = connFunction; //commonJs 语法，导出conn模块。