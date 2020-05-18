const Transac = require("./classes/transaction");
const fs = require("fs");
const readline = require("readline");

const main2 = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  var path;
  const question1 = () => {
    return new Promise((resolve, reject) => {
      rl.question("Enter the path of binary file:  ", (answer) => {
        path = answer;
        resolve();
      });
    });
  };

  await question1();
  rl.close();

  const readfile = async () => {
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
  const buffer = await readfile();
  const newTransac = new Transac();
  await newTransac.convertByte2Transaction(buffer);
};

main2();
