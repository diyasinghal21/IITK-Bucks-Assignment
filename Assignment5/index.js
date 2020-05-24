const block = require('./classes/block');

const main = async () => {
    const Block = new block();
    await Block.create_header();
    await Block.create_data_hash();
    await Block.find_nonce();

    console.log(Block.nonce);
    console.log(Block.time);

}

main();
