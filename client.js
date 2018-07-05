const rpc = require('node-json-rpc');
const client = new rpc.Client({ port: 5433, host: '127.0.0.1', path: '/' });

function rsh(command, input) {
  command = Buffer.from(command, 'utf8');
  input = Buffer.from(input, 'utf8');
  function callback(err, res) {
    if (err) { console.log(err); }
    console.log(res.result);
    process.exit(0);
  }
  client.call({"jsonrpc": "2.0", "method": "sh", "params": { command, input }, "id": 0}, callback);  
}

let data = '';
const command = process.argv.slice(2).join(' ');

// process.stdin.resume();
process.stdin.setEncoding('utf8');

let timeout = setTimeout(() => rsh(command, ''), 100);

process.stdin.on('data', (chunk) => {
  clearTimeout(timeout);
  data += chunk;
});

process.stdin.on('end', () => {
  rsh(command, data);
});