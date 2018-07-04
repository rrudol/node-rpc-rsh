var rpc = require('node-json-rpc');
 
var options = {
  port: 5433,
  host: '127.0.0.1',
  path: '/',
};

var client = new rpc.Client(options);

client.call(
  {"jsonrpc": "2.0", "method": "myMethod", "params": [1,2], "id": 0},
  (err, res) => {
    if (err) { console.log(err); }
    console.log(res);
  }
);