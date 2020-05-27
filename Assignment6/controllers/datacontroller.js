const fetch = require("node-fetch");
const peers = require("../peers.json");

var data = {};

const adddata = async (req, res, next) => {
    if (!(req.body.key in data)) {
        var flag = 0;
        const key = req.body.key;
        const value = req.body.value;
        data[key] = value;
        console.log("set", "{", key, ":", value, "}", "to localhost");


        for (x in peers) {
            fetch(peers[x] + "/add", {
                method: 'POST', body: JSON.stringify(req.body),
                headers: { 'Content-Type': 'application/json' },
            }).then(console.log("set", "{", key, ":", value, "}", "to url :", peers[x] + "/add")).catch(err => { console.log(err) });

        }
        res.end("completed");
    }
    else {
        res.end("already exists");
    }

}

const getdata = async (req, res, next) => {

    res.json(data);


}

exports.adddata = adddata;
exports.getdata = getdata;
