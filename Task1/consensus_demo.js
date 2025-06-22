// Simulates PoW, PoS, and DPoS consensus mechanisms

class Validator {
    constructor(id, power, stake) {
        this.id = id;
        this.power = power; // For PoW
        this.stake = stake; // For PoS
        this.votes = 0;     // For DPoS
    }
}

function simulatePoW(validators) {
    // Select validator with highest computational power
    const winner = validators.reduce((max, v) => v.power > max.power ? v : max);
    console.log(`PoW Consensus: Validator ${winner.id} selected (Power: ${winner.power})`);
    console.log("Explanation: PoW selects the validator with the highest computational power, simulating mining capability.\n");
}

function simulatePoS(validators) {
    // Select validator with highest stake
    const winner = validators.reduce((max, v) => v.stake > max.stake ? v : max);
    console.log(`PoS Consensus: Validator ${winner.id} selected (Stake: ${winner.stake})`);
    console.log("Explanation: PoS selects the validator with the highest stake, incentivizing those with more investment in the network.\n");
}

function simulateDPoS(validators, voters) {
    // Assign random votes from voters to validators
    validators.forEach(v => v.votes = 0); // Reset votes
    voters.forEach(() => {
        const chosenValidator = validators[Math.floor(Math.random() * validators.length)];
        chosenValidator.votes++;
    });
    // Select validator with most votes
    const winner = validators.reduce((max, v) => v.votes > max.votes ? v : max);
    console.log(`DPoS Consensus: Validator ${winner.id} selected (Votes: ${winner.votes})`);
    console.log("Explanation: DPoS selects a delegate based on votes from stakeholders, simulating a democratic process.\n");
}

// Run simulation
const validators = [
    new Validator(1, Math.floor(Math.random() * 91) + 10, Math.floor(Math.random() * 151) + 50),
    new Validator(2, Math.floor(Math.random() * 91) + 10, Math.floor(Math.random() * 151) + 50),
    new Validator(3, Math.floor(Math.random() * 91) + 10, Math.floor(Math.random() * 151) + 50)
];
console.log("Validators:");
validators.forEach(v => console.log(`Validator ${v.id}: Power=${v.power}, Stake=${v.stake}`));
console.log();

const voters = ["Voter1", "Voter2", "Voter3"];
simulatePoW(validators);
simulatePoS(validators);
simulateDPoS(validators, voters);