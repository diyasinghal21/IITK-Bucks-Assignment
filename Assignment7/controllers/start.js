
const block = require("../classes/block");
const { workerData, parentPort } = require("worker_threads");

const starting = async () => {
    const b = new block();

    var index = "1";
    var phash = "0000000000000000000000000000000000000000000000000000000000000000";
    var path = "./015.dat";
    var target = "000f000000000000000000000000000000000000000000000000000000000000";

    await b.create_header(index, phash, path, target);
    await b.create_data_hash();
    parentPort.postMessage({ result: "Searching", nonce: "-1" });
    const res = await b.find_nonce();
    parentPort.postMessage({ result: "Found", nonce: res });

}


starting();