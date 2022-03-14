const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const { interface, bytecode }= require('./compile');

const provider = new HDWalletProvider(process.env.MNEMONIC,'https://rinkeby.infura.io/v3/d8c0d693cdbc462790e7917271d372e6');

const web3 = new Web3(provider);

async function deploy(){
    const accounts = await web3.eth.getAccounts();
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments:['First Deployment']})
        .send({gas:'1000000', from: accounts[0]});
    console.log(' Here is the contract', result.options.address)
};

deploy();