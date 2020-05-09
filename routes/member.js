const express = require('express');
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
          userName: item.userName,
          level: item.level,
          sortNumber: +item.sortNumber,
          integral: +item.integral,
          integralDetail: item.integralDetail,
          isApplySS: item.isApplySS,
          // password: item.password,
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

router.post('/login', function (req, res) {
  queryDB.queryMember(req.body).then(data => {
    if (data.length > 0) {
      let obj = {
        integral: data[0].integral,
        integralDetail: data[0].integralDetail,
        isAdmin: data[0].isAdmin,
        isApplySS: data[0].isApplySS,
        level: data[0].level,
        sortNumber: data[0].sortNumber,
        uid: data[0].uid,
        userName: data[0].userName
      }
      res.json({
        msg: "登录成功",
        success: true,
        info: obj
      })
    } else {
      res.json({
        msg: "登录失败",
        success: false
      })
    }
  })
});

router.post('/resetPwd', function (req, res) {
  let queryObj = {
    uid: req.body.uid,
    password: req.body.password
  }
  queryDB.queryMember(queryObj).then(data => {
    // 如果存在此成員
    if (data.length > 0) {
      editDB.editMember(req.body.uid, { password: req.body.newPassword }).then(editData => {
        res.json({
          msg: "密码修改成功",
          success: true
        })
      })
    } else {
      res.json({
        msg: "uid或密码错误",
        success: false
      })
    }
  })
})

module.exports = router;   //暴露这个 router模块