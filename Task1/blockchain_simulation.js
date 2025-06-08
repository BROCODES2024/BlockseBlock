// Simulates a basic blockchain with 3 linked blocks
const crypto = require('crypto');

class Block {
    constructor(index, timestamp, data, previousHash) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        // Creates SHA-256 hash of block's contents
        const blockString = JSON.stringify({
            index: this.index,
            timestamp: this.timestamp,
            data: this.data,
            previousHash: this.previousHash,
            nonce: this.nonce
        });
        return crypto.createHash('sha256').update(blockString).digest('hex');
    }
}

function createBlockchain() {
    // Initialize blockchain with genesis block
    const blockchain = [new Block(0, Date.now(), "Genesis Block", "0")];
    console.log("Created Genesis Block:");
    console.log(`Index: ${blockchain[0].index}, Hash: ${blockchain[0].hash}, Previous Hash: ${blockchain[0].previousHash}\n`);

    // Create two more blocks
    for (let i = 1; i < 3; i++) {
        const newBlock = new Block(i, Date.now(), `Block ${i} Data`, blockchain[i-1].hash);
        blockchain.push(newBlock);
        console.log(`Created Block ${i}:`);
        console.log(`Index: ${newBlock.index}, Hash: ${newBlock.hash}, Previous Hash: ${newBlock.previousHash}\n`);
    }

    return blockchain;
}

function tamperBlock(blockchain, blockIndex, newData) {
    // Tamper with a block's data and observe chain invalidity
    console.log(`\nTampering with Block ${blockIndex}...`);
    blockchain[blockIndex].data = newData;
    blockchain[blockIndex].hash = blockchain[blockIndex].calculateHash();
    console.log(`New Block ${blockIndex} Hash: ${blockchain[blockIndex].hash}\n`);

    // Check validity of subsequent blocks
    for (let i = blockIndex + 1; i < blockchain.length; i++) {
        const isValid = blockchain[i].previousHash === blockchain[i-1].hash;
        console.log(`Block ${i} is ${isValid ? 'valid' : 'invalid'} (Previous Hash: ${blockchain[i].previousHash}, Expected: ${blockchain[i-1].hash})`);
    }
}

// Run simulation
const blockchain = createBlockchain();
tamperBlock(blockchain, 1, "Tampered Data");