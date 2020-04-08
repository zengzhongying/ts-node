const express = require("express");
const app = express();
app.listen(8999, () => { console.log("服務啟動") })

app.get("/", (req, res) => {
  res.json("Higggg")
})