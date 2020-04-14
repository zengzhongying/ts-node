const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

//引入路由模块
const member = require('./routes/member.js');

// const mongoose = require('mongoose');
const queryDB = require("./db/query");
const addDB = require("./db/add");
const editDB = require("./db/edit");
const delDB = require("./db/delete");
const user = require("./outApi/getUser")
app.use(bodyParser.json());
//解決跨域
app.use(cors());
// 使用路由模块
app.use('/member', member)

app.listen(8999, () => { console.log("服務啟動") });

// 根据uid获取用户信息
// http://statistics.pandadastudio.com/player/simpleInfo?uid=311484178

app.get("/getUser", (req, res) => {
  user.getUser(req.query.uid).then(data => {
    res.json({
      msg: "获取用户信息成功",
      success: true,
      data: JSON.parse(data.body).data
    })
  }).catch(err => {
    res.send("获取信息失败" + err);
  })
})

