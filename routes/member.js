const express = require('express');
const bodyParser = require("body-parser");
express
const router = express.Router();   //可使用 express.Router 类创建模块化、可挂载的路由句柄
// 导入操作数据库模块
const queryDB = require("../db/query");
const addDB = require("../db/add");
const editDB = require("../db/edit");
const delDB = require("../db/delete");

router.get('/get', function (req, res) {
  queryDB.queryMember(req.query).then(data => {
    res.json(
      data.map(item => {
        return {
          uid: +item.uid,
          sortNumber: +item.sortNumber,
          integral: +item.integral,
          isApplySS: item.isApplySS,
          password: item.password,
          isAdmin: item.isAdmin
        }
      })
    )
  }).catch(err => {
    res.json({
      msg: "获取信息失败" + err,
      status: false
    })
  })
});

router.post('/add', function (req, res) {
  addDB.addMember(req.body).then(data => {
    res.json({
      msg: "添加成功",
      success: true
    })
  }).catch(err => {
    res.json({
      msg: "添加失败" + err,
      status: false
    })
  })
});

router.post('/edit', function (req, res) {
  editDB.editMember(
    req.body.uid,
    req.body.memberInfo
  ).then(data => {
    res.json({
      msg: "更新成功",
      success: true
    })
  }).catch(err => {
    res.json({
      msg: "更新失败" + err,
      status: false
    })
  })
});

router.post('/delete', function (req, res) {
  delDB.delMember(req.body).then(data => {
    res.json({
      msg: "删除成功",
      success: true
    })
  }).catch(err => {
    res.json({
      msg: "删除失败" + err,
      success: false
    })
  })
});

module.exports = router;   //暴露这个 router模块