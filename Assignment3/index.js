const Transac = require("./classes/transaction");
const fs = require("fs");

const main = async () => {
  const trans = new Transac();
  const buff = await trans.createTransaction();

  var filePath = "./binaryfiles/" + trans.transcationId + ".dat";

  fs.closeSync(fs.openSync(filePath, "w"));
  var wstream = fs.createWriteStream(filePath);
  wstream.write(buff);
  wstream.end();
};

main();
