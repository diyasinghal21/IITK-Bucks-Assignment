const readline = require("readline");
const fs = require("fs");
const crypto = require("crypto");
const bignum = require("bignum");

var path;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});
const convert2str = (buf) => {
  return buf.toString("utf8");
};
const convert2int = (buffer) => {
  return bignum.fromBuffer(buffer).toString();
};
const num2hex = (buffer) => {
  return buffer.toString("hex");
};

const main = async () => {
  const question1 = () => {
    return new Promise((resolve, reject) => {
      rl.question("Enter the path of binary file ", (answer) => {
        path = answer;
        resolve();
      });
    });
  };

  await question1();
  rl.close();

  const reading = () => {
    return new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(path, { highWaterMark: 16 });
      const data = [];

      readStream.on("data", (chunk) => {
        data.push(chunk);
      });

      readStream.on("end", () => {
        resolve(Buffer.concat(data));
      });

      readStream.on("error", (err) => {
        console.log("error :", err);
        reject();
      });
    });
  };
  const buffer = await reading();
  var hash = crypto.createHash("sha256");
  hash_update = hash.update(buffer, "binary");
  generated_hash = hash_update.digest("hex");
  console.log("Transaction ID : ", generated_hash);
  const Transactionfrombytearray = (buff) => {
    var i = 0;
    const noofInputs = buff.slice(i, i + 4);
    console.log("Number of inputs :", convert2int(noofInputs));
    var n = parseInt(convert2int(noofInputs));
    i = i + 4;
    for (var index = 1; index <= n; index++) {
      console.log("\t Input", index, ":");
      console.log("\t\t Transaction ID: ", num2hex(buff.slice(i, i + 32)));
      i = i + 32;
      console.log("\t\t Index :", convert2int(buff.slice(i, i + 4)));
      i = i + 4;
      console.log(
        "\t\t Length of the Signature :",
        convert2int(buff.slice(i, i + 4))
      );
      var len = parseInt(convert2int(buff.slice(i, i + 4)));
      i = i + 4;
      console.log("\t\t Signature :", num2hex(buff.slice(i, i + len)));
      i = i + len;
    }
    const noofOutputs = buff.slice(i, i + 4);
    console.log("Number of Outputs :", convert2int(noofOutputs));
    var m = parseInt(convert2int(noofOutputs));
    i = i + 4;
    for (var index = 1; index <= m; index++) {
      console.log("\t Output", index, ":");
      console.log("\t\t Number of Coins : ", convert2int(buff.slice(i, i + 8)));
      i = i + 8;
      console.log(
        "\t\t Length of Public Key :",
        convert2int(buff.slice(i, i + 4))
      );
      var len = parseInt(convert2int(buff.slice(i, i + 4)));
      i = i + 4;
      console.log("\t\t Public Key :", convert2str(buff.slice(i, i + len)));
      i = i + len;
    }
  };
  await Transactionfrombytearray(buffer);
};
main();
