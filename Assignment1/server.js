const express = require("express");
const bodyParser = require("body-parser");
var hash = require("hash.js");

const app = express();
app.use(bodyParser.json({ type: "application/json" }));

const target = 0x0000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;
console.log(target);

app.post("/hash", (req, res, next) => {
  console.log(req.body.data);
  var i = 1;
  while (true) {
    var answer = hash
      .sha256()
      .update(req.body.data + i)
      .digest("hex");
    var ans = parseInt(answer, 16);
    if (ans <= target) {
      res.json(JSON.parse(JSON.stringify({ hash: req.body.data + i })));
      break;
    }
    i++;
  }
});

app.listen(8787);
