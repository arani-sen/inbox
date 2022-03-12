import path from "path";
import fs from "fs";
import {compile} from "solc"

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf-8');

console.log(compile(source,1));