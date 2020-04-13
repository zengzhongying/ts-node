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
// app.use(bodyParser.urlencoded({ extended: false }));
//解決跨域
app.use(cors());

app.use('/member', member)
app.listen(8999, () => { console.log("服務啟動") });

// 根据uid获取用户信息
// http://statistics.pandadastudio.com/player/simpleInfo?uid=311484178


// let login = false;
// app.post("/login", (req, res) => {
//   login = true;
//   res.json("登錄成功")
// })
// app.all("*", (req, res, next) => {
//   if (!login) {
//     return res.json("請先登錄")
//   } else {
//     next();
//   }
// })
app.get("/", (req, res) => {
  // console.log(req.query)
  queryDB.queryStudent(req.query).then(data => {
    res.json(
      data.map(item => {
        return { name: item.name, age: item.age, id: item._id }
      })
    )
  })
})

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

// app.post("/add", (req, res) => {
//   // console.log(req.body, '嘿嘿')
//   // if(req.body)
//   addDB.addStudent(req.body).then(data => {
//     res.json({
//       msg: "添加成功",
//       success: true
//     })
//   }).catch(err => {
//     res.json({
//       msg: "添加失败" + err,
//       status: false
//     })
//   })
// })

// req.body形式： {
//   id: Number,
//     student: {
//     name: String,
//       age: Number
//   }
// }

// app.post("/edit", (req, res) => {
//   editDB.editStudent(
//     req.body.id,
//     req.body.student
//   ).then(data => {
//     res.json({
//       msg: "更新成功",
//       success: true
//     })
//   }).catch(err => {
//     res.json({
//       msg: "更新失败" + err.errmsg,
//       status: false
//     })
//   })
// })


// app.post('/delete', (req, res) => {
//   delDB.delStudent(req.body).then(data => {
//     res.json({
//       msg: "删除成功",
//       success: true
//     })
//   }).catch(err => {
//     res.json({
//       msg: "删除失败" + err,
//       success: false
//     })
//   })
// })

