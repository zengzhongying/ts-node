const express = require("express");
const mysql = require('mysql');
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//解決跨域
app.use(cors());
app.listen(8999, () => { console.log("服務啟動") })
let login = false;
app.post("/login", (req, res) => {
  login = true;
  res.json("登錄成功")
})
app.all("*", (req, res, next) => {
  if (!login) {
    return res.json("請先登錄")
  } else {
    next();
  }
})
app.get("/", (req, res) => {
  res.json("Higggg")
})

// app.post('/test', (req, res) => {
//   return res.json({ query: req.query, data: req.params, json: req.body })
// })

