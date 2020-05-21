const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const https = require('https')   //升級為https
const app = express();
const fs = require('fs');

//引入路由模块
const member = require('./routes/member.js');
const ssList = require('./routes/ssList.js');

const user = require("./outApi/getUser")
app.use(bodyParser.json());
//解決跨域
app.use(cors());
// 使用路由模块
app.use('/member', member)
app.use('/ssList', ssList)

// app.listen(8111, () => { console.log("服務啟動") });
https.createServer({
  key: fs.readFileSync('./module/2_nnnight.club.key'),//证书文件的存放目录
  cert: fs.readFileSync('./module/1_nnnight.club_bundle.crt')
}, app).listen(443);//https默认是443端口

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

