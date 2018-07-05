const rpc = require('node-json-rpc');
const client = new rpc.Client({ port: 5433, host: '127.0.0.1', path: '/' });

function rsh(command, input) {
  command = Buffer.from(command, 'utf8');
  input = Buffer.from(input, 'utf8');
  function callback(err, res) {
    if (err) { console.log(err); }
    console.log(res);
  }
  client.call({"jsonrpc": "2.0", "method": "sh", "params": { command, input }, "id": 0}, callback);  
}

rsh('grep world', `hello world
test abc
world of tests`);