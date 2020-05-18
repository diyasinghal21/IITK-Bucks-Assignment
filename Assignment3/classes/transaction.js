const Input = require("./input");
const Output = require("./output");
const readline = require("readline");
const fs = require("fs");
const crypto = require("crypto");
const num32 = require("../container/int32");
const num64 = require("../container/int64");
const num256 = require("../container/int256");
const strbin = require("../container/utf8");
const bufftohex = require("../container/bufftohex");
const bufftostr = require("../container/bufftostr");
const convert2int = require("../container/conver2int");

module.exports = class Transaction {
  constructor(numInput, numOutput) {
    this.transcationId = 0x0;
    this.numInput = numInput;
    this.numOutput = numOutput;
    this.inputs = [];
    this.outputs = [];
    this.inputs_buff = [];
    this.outputs_buff = [];
  }

  async addInput() {
    const input = new Input();
    await input.create_input();
    this.inputs_buff.push(Buffer.concat(input.buffers));
  }

  async addOutput() {
    const output = new Output();
    await output.create_output();
    this.outputs_buff.push(Buffer.concat(output.buffers));
  }

  async createTransaction() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
    });

    var numInput, numOutput;
    const question1 = () => {
      return new Promise((resolve, reject) => {
        rl.question("Enter the number of inputs ", (answer) => {
          numInput = answer;
          resolve();
        });
      });
    };

    const question2 = () => {
      return new Promise((resolve, reject) => {
        rl.question("Enter the number of outputs ", (answer) => {
          numOutput = answer;
          resolve();
        });
      });
    };
    await question1();
    await question2();

    rl.close();

    this.numInput = numInput;
    this.numOutput = numOutput;

    for (var i = 0; i < numInput; i++) {
      await this.addInput();
    }
    for (var i = 0; i < numOutput; i++) {
      await this.addOutput();
    }

    var list = [];
    list.push(num32.numto32(numInput.toString()));
    list.push(Buffer.concat(this.inputs_buff));
    list.push(num32.numto32(numOutput.toString()));
    list.push(Buffer.concat(this.outputs_buff));
    const newbuff = Buffer.concat(list);
    var hash = crypto.createHash("sha256");
    var hash_update = hash.update(newbuff, "binary");
    var generated_hash = hash_update.digest("hex");
    this.transcationId = generated_hash;
    return newbuff;
  }

  convertTransactiontobyte() {
    var list = [];
    list.push(this.inputs_buff);
    list.push(this.outputs_buff);
    var newbuff = Buffer.concat(list);
    return newbuff;
  }

  async convertByte2Transaction(buff) {
    var hash = crypto.createHash("sha256");
    var hash_update = hash.update(buff, "binary");
    var generated_hash = hash_update.digest("hex");
    this.transcationId = generated_hash;

    var i = 0;
    const noofInputs = convert2int.fromBuffer(buff.slice(i, i + 4));
    this.numInput = noofInputs;
    var n = parseInt(convert2int.fromBuffer(this.numInput));
    i = i + 4;

    for (var index = 1; index <= n; index++) {
      const input = new Input();
      input.transactionId = bufftohex.fromBuffer(buff.slice(i, i + 32));
      i = i + 32;
      input.index = convert2int.fromBuffer(buff.slice(i, i + 4));
      i = i + 4;
      input.lenSign = convert2int.fromBuffer(buff.slice(i, i + 4));
      var len = parseInt(input.lenSign);
      i = i + 4;
      input.signature = bufftohex.fromBuffer(buff.slice(i, i + len));
      i = i + len;
      this.inputs.push(input);
    }

    const noofOutputs = convert2int.fromBuffer(buff.slice(i, i + 4));
    this.numOutput = noofOutputs;
    var m = parseInt(this.numOutput);
    i = i + 4;
    for (var index = 1; index <= m; index++) {
      const output = new Output();
      output.noOfcoins = convert2int.fromBuffer(buff.slice(i, i + 8));
      i = i + 8;
      output.lenPubKey = convert2int.fromBuffer(buff.slice(i, i + 4));
      var len = parseInt(output.lenPubKey);
      i = i + 4;
      output.pubKey = bufftostr.fromBuffer(buff.slice(i, i + len));
      i = i + len;
      this.outputs.push(output);
    }
    console.log("Transaction ID : ", this.transcationId);
    for (var i = 1; i <= this.numInput; i++) {
      console.log("\t Input", i, ":");
      this.inputs[i - 1].print_inputdata();
    }
    for (var i = 1; i <= this.numOutput; i++) {
      console.log("\t Output", i, ":");
      this.outputs[i - 1].print_output();
    }
  }
};
