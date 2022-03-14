// contract test code will go here
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const {interface, bytecode} = require('../compile');
const web3 = new Web3(ganache.provider());

let accounts;
let inbox;
const init = "Hi There!";
beforeEach(async ()=>{
    // Getting list of accounts
    accounts = await web3.eth.getAccounts();
    // use one of the accounts to get contracts

   inbox =  await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data:bytecode, arguments:[init]})
        .send({from:accounts[0], gas:'1000000'})
});


describe('Inbox', ()=>{
    it('deploys a contract',() =>{
        assert.ok(inbox.options.address);
    })

    it('has a default message',async ()=>{
        const message = await inbox.methods.message().call();
        assert.equal(message, init)
    })

    it('can set  a new message',async ()=>{
       await inbox.methods.setMessage('Hey').send({
           from:accounts[0]
       });
       const newMessage = await inbox.methods.message().call();
       assert.equal(newMessage,'Hey');
    });
})