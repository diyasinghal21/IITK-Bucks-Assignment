const express = require("express")
const bodyparser = require("body-parser")
const { Worker } = require("worker_threads");

var result = {};

const app = express()

app.use(bodyparser.json())

app.post('/start', (req, res, next) => {

    const worker = new Worker('./controllers/start.js');
    worker.on('message', (msg) => {

        result = msg;
        console.log(msg);
    }
    );
    worker.on('error', (err) => {
        console.log(err);
    });
    worker.on('exit', (code) => {
        console.log(code);
        console.log("Found the nonce");
    });

    res.status(201).json({ message: "Finding nonce" });


}
);

app.get('/result', (req, res, next) => {

    res.status(200).json(result);

});

app.listen(4000, () => {
    console.log("Listening on port 4000");
})
