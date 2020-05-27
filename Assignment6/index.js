const express = require("express");
const bodyparser = require("body-parser");
const controller = require("./controllers/datacontroller");
const app = express();
app.use(bodyparser.json());

app.post("/add", controller.adddata);
app.get("/list", controller.getdata);


app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(500);
    res.json({ message: error.message || "an unkonwn error ocurred" });
});

app.listen(5000);