// Simulates Proof-of-Work mining with nonce incrementing
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

    mineBlock(difficulty) {
        // Mines block by finding nonce that produces hash with required leading zeros
        const target = "0".repeat(difficulty);
        const startTime = performance.now();
        let attempts = 0;

        console.log(`Mining block with difficulty ${difficulty} (hash must start with ${target})...`);
        while (this.hash.substring(0, difficulty) !== target) {
            this.nonce++;
            attempts++;
            this.hash = this.calculateHash();
        }

        const endTime = performance.now();
        console.log(`Block mined! Nonce: ${this.nonce}`);
        console.log(`Attempts: ${attempts}`);
        console.log(`Time taken: ${(endTime - startTime) / 1000} seconds`);
        console.log(`Final Hash: ${this.hash}\n`);
    }
}

// Run simulation
const block = new Block(1, Date.now(), "Block 1 Data", "0");
block.mineBlock(4);