const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

// const mongoose = require('mongoose');
const queryDB = require("./db/query");
const addDB = require("./db/add");

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
//解決跨域
app.use(cors());
app.listen(8999, () => { console.log("服務啟動") })




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
  console.log(req.query)
  queryDB.queryStudent(req.query).then(data => {
    res.json(
      data.map(item => {
        return { name: item.name, age: item.age }
      })
    )
  })
})

app.post("/add", (req, res) => {
  console.log(req.body, '嘿嘿')
  // if(req.body)
  addDB.addStudent(req.body).then(data => {
    res.json({
      msg: "添加成功",
      status: 200
    })
  }).catch(err => {
    console.log(err, 'err')
  })
})

// app.post('/test', (req, res) => {
//   return res.json({ query: req.query, data: req.params, json: req.body })
// })

