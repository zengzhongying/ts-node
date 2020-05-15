const express = require('express');
const router = express.Router();   //可使用 express.Router 类创建模块化、可挂载的路由句柄
// 导入操作数据库模块
const queryDB = require("../db/query");
const addDB = require("../db/add");
const editDB = require("../db/edit");
const delDB = require("../db/delete");

router.get('/get', function (req, res) {
  queryDB.querySS(req.query).then(data => {
    res.json(
      data.map(item => {
        return {
          time: item.time,
          boss: item.boss,
          leader: item.leader
        }
      })
    )
  }).catch(err => {
    res.json({
      msg: "获取SS列表失败" + err,
      status: false
    })
  })
});

// 添加ss
router.post('/add', function (req, res) {
  addDB.addSS(req.body).then(data => {
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


router.post('/delete', function (req, res) {
  delDB.delSS(req.body).then(data => {
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

router.post('/done', async function (req, res) {

  let queryMemberRes = await queryDB.queryMember({ uid: req.body.leader.uid });
  let memberInfo = queryMemberRes[0];
  // console.log("积分信息", memberInfo)
  if (memberInfo.integralDetail && memberInfo.integralDetail.length < 10) {
    memberInfo.integralDetail.push({
      mark: 3,
      desc: `贡献SS${req.body.boss}`
    })
    memberInfo.integral += 3;
  } else {
    //如果超过10条  则删除最前面的一条  再插入数据
    memberInfo.integralDetail.shift();
    memberInfo.integralDetail.push({
      mark: 3,
      desc: `贡献SS${req.body.boss}`
    })
    memberInfo.integral += 3;
  }

  // // 更新贡献SS的积分信息
  await editDB.editMember(req.body.leader.uid, memberInfo);

  //删除完成的那条数据
  delDB.delSS(req.body).then(data => {
    res.json({
      msg: "已完成并更新对应成员积分信息",
      success: true
    })
  }).catch(err => {
    res.json({
      msg: "失败" + err,
      success: false
    })
  })
});


module.exports = router;   //暴露这个 router模块