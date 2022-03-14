const path = require(  "path");
const fs = require('fs')
const solc = require('solc');

const inboxPath = path.join(__dirname, '/contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf-8');

console.log(solc.compile(source,1));