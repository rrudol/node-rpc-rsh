const { spawn } = require('child_process');
const rpc = require('node-json-rpc');
const serv = new rpc.Server({ port: 5433, host: '127.0.0.1', path: '/' });

serv.addMethod('sh', (para, cb) => {
  const command = Buffer.from(para.command.data).toString();
  const program = command.split(' ')[0];
  const args = command.split(' ').slice(1);
  const input = Buffer.from(para.input.data).toString();
  const child = spawn(program, args);
  child.stdin.setEncoding('utf-8');
  let response = "";
  child.stdout.on('data', (chunk) => {
    response += chunk.toString();
  });
  setTimeout(() => {
    child.stdin.write(input);
    child.stdin.end();
  }, 1);
  child.on('close', (code) => {
    cb(false, response);
    console.log(`child process exited with code ${code}`);
  });
});
 
serv.start(error => {
  if (error) throw error;
  console.log('Server running ...');
});