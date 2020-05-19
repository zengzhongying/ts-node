const express = require('express');
const router = express.Router();   //可使用 express.Router 类创建模块化、可挂载的路由句柄
// 导入操作数据库模块
const queryDB = require("../db/query");
const addDB = require("../db/add");
const editDB = require("../db/edit");
const delDB = require("../db/delete");

router.get('/get', function (req, res) {
  queryDB.querySS(req.query).then(data => {
    // res.json(
    //   data.map(item => {
    //     return {
    //       id: ObjectId,
    //       time: item.time,
    //       boss: item.boss,
    //       leader: item.leader
    //     }
    //   })
    // )
    res.json(data)
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


// 加入ss
router.post('/join', async function (req, res) {
  // console.log(req.body, "嘻嘻")

  let querySSRes = await queryDB.querySS({ _id: req.body._id })
  //如果存在这个ss
  if (querySSRes.length > 0) {
    let obj = querySSRes[0];
    //查询申请ss的人的信息
    let queryMemberRes = await queryDB.queryMember({ uid: req.body.uid });
    // 兼容老数据
    if (!obj.member) {
      obj.member = [];
    }
    //判断此成员是否申请过ss
    let ssList = await queryDB.querySS();
    let joinlist = [];
    ssList.forEach(i => {
      joinlist = [...joinlist, ...i.member];
    })
    let isJoin = joinlist.some(item =>
      item.uid == req.body.uid
    )
    if (isJoin) {
      res.json({
        msg: "你已经申请过SS了",
        success: false
      })
    } else {
      obj.member.push({
        integral: queryMemberRes[0].integral,
        sortNumber: queryMemberRes[0].sortNumber,
        userName: queryMemberRes[0].userName,
        uid: queryMemberRes[0].uid
      });
      //按照积分排序  积分大的在前面
      obj.member = obj.member.sort(function compareNumber(a, b) {
        return b.integral - a.integral
      });
      editDB.editSS(req.body._id, obj).then(data => {
        // 修改申请人的ss申请状态
        editDB.editMember(req.body.uid, { isApplySS: true }).then(editMemberRes => {
          res.json({
            msg: "申请上车成功",
            success: true
          })
        }).catch(err => {
          res.json({
            msg: "上车失败" + err,
            success: false
          })
        })

      }).catch(err => {
        res.json({
          msg: "上车失败",
          success: false
        })
      });
    }
  }
});

//取消加入
router.post('/cancelJoinSS', async function (req, res) {
  // req.body: {
  //   _id: xxx,   //ss的_id
  //   uid： xxx    //取消上车的人的uid
  // }
  // 找出取消上车的那个ss
  const querySSRes = await queryDB.querySS({ _id: req.body._id });
  let obj = querySSRes[0];
  let idx = obj.member.findIndex(item => item.uid == req.body.uid);
  obj.member.splice(idx, 1);
  editDB.editSS(req.body._id, obj).then(data => {
    // 修改申请人的ss申请状态
    editDB.editMember(req.body.uid, { isApplySS: false }).then(editMemberRes => {
      res.json({
        msg: "下车成功",
        success: true
      })
    }).catch(err => {
      res.json({
        msg: "下车失败" + err,
        success: false
      })
    })
  }).catch(err => {
    res.json({
      msg: "下车失败",
      success: false
    })
  });
})




router.post('/delete', function (req, res) {
  //更新所有乘客isApplySS状态
  let promiseList = [];
  req.body.member.forEach(i => {
    promiseList.push(editDB.editMember(i.uid, { isApplySS: false }));
  })
  Promise.all(promiseList).then(allDone => {
    delDB.delSS({ _id: req.body._id }).then(data => {
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
  })

});

router.post('/done', async function (req, res) {
  // req.body将整个ss车的信息传入进来了
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
  //更新所有乘客isApplySS状态
  let promiseList = [];
  req.body.member.forEach(i => {
    promiseList.push(editDB.editMember(i.uid, { isApplySS: false }));
  })
  Promise.all(promiseList).then(allDone => {
    //删除完成的那条数据
    delDB.delSS({ _id: req.body._id }).then(data => {
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
  })
});


module.exports = router;   //暴露这个 router模块