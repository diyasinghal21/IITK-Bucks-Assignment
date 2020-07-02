const readline = require("readline");
const fs = require("fs");
const crypto = require("crypto");
const int32 = require("../container/int32");
const int64 = require("../container/int64");
const int256 = require("../container/int256");
const utf8 = require("../container/utf8");
const now = require("nano-time");
var bignum = require("bignum");

module.exports = class Block {
    constructor(
        index = "",
        phash = "",
        bodyhash = "",
        target = "",
        time = "",
        nonce = "",
        blockhash = ""
    ) {
        this.index = index;
        this.phash = phash;
        this.bodyhash = bodyhash;
        this.target = target;
        this.time = time;
        this.nonce = nonce;
        this.body_buff = [];
        this.path = "";
        this.blockhash = blockhash;
    }

    async create_header(index, phash, path, target) {
        this.index = index;
        this.phash = phash;
        this.target = target;
        this.path = path;
    }

    async create_data_hash() {
        const readfile = async () => {
            return new Promise((resolve, reject) => {
                const readStream = fs.createReadStream(this.path, {
                    highWaterMark: 16,
                });
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
        this.body_buff.push(buffer);
        var hash = crypto.createHash("sha256");
        var hash_update = hash.update(buffer, "binary");
        var generated_hash = hash_update.digest("hex");
        this.bodyhash = generated_hash;
    }

    async create_block_hash() {
        this.time = now();
        var list = [];
        var list1 = [];
        var buff1 = int32.numto32(this.index);
        list.push(buff1);
        var buff2 = int256.toBuffer(this.bodyhash);
        list.push(buff2);
        var buff3 = int256.toBuffer(this.phash);
        list.push(buff3);
        var buff4 = int256.toBuffer(this.target);
        list.push(buff4);
        var buff5 = int64.numto64(this.time);
        list.push(buff5);
        var buff6 = int64.numto64(this.nonce);
        list.push(buff6);

        var head_buff = Buffer.concat(list);

        var hash = crypto.createHash("sha256");
        var hash_update = hash.update(head_buff, "binary");
        var generated_hash = hash_update.digest("hex");
        this.blockhash = generated_hash;
    }

    async find_nonce() {
        var index = bignum("0");
        var t = bignum(this.target);
        while (true) {
            this.nonce = index;
            await this.create_block_hash();
            var b = bignum(this.blockhash);
            if (this.blockhash < this.target) {
                return this.nonce.toString();
            } else {
                console.log(this.nonce.toString());
                console.log(this.time);
                console.log(this.blockhash);
            }
            index = bignum.add(index, bignum("1"));
        }
    }
};
