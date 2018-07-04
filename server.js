const { spawn } = require('child_process');

var rpc = require('node-json-rpc');
 
var options = {
  port: 5433,
  host: '127.0.0.1',
  path: '/',
};

 
var serv = new rpc.Server(options);
 
serv.addMethod('myMethod', function (para, callback) {
  var error, result;

  const child = spawn('../RPC-RSH/a.out', ['komenda']);
  child.stdin.setEncoding('utf-8');
  
  child.stdout.on('data', (chunk) => {
    console.log(chunk.toString());
  });

  setTimeout(function(){
    child.stdin.write("console.log('Hey there')\n");
    child.stdin.end();
  }, 100);
  
  child.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
 
  callback(error, 10);
});
 
serv.start(error => {
  if (error) throw error;
  console.log('Server running ...');
});