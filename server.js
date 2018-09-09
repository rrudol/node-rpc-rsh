#!/usr/bin/env node

const { spawn } = require("child_process");
const rpc = require("node-json-rpc");
const chalk = require("chalk");
const serv = new rpc.Server({ port: 5433, host: process.argv[2], path: "/" });

serv.addMethod("sh", (para, cb) => {
  const command = Buffer.from(para.command.data).toString();
  const program = command.split(" ")[0];
  const args = command.split(" ").slice(1);
  const input = Buffer.from(para.input.data).toString();
  console.log(
    chalk.yellow(
      `Recived Remote Procedure '${chalk.bold(
        command
      )}', executing '${chalk.bold(program)}'`
    )
  );
  if (input) {
    console.log(`Providing input \n${chalk.gray(input)}`);
  }

  let response = "";
  let stderr = "";

  const child = spawn(program, args);
  child.on("error", function(err) {
    cb(false, stderr);
    console.log(chalk.red("Oh noez, teh errurz: " + err + response));
    process.exit(1);
  });

  child.stdin.setEncoding("utf-8");

  child.stdout.on("data", chunk => {
    response += chunk.toString();
  });

  child.stderr.on("data", chunk => {
    // console.error(`child stderr:\n${data}`);
    stderr += chunk.toString();
  });

  setTimeout(() => {
    child.stdin.write(input);
    child.stdin.end();
  }, 0);

  child.on("close", code => {
    console.log(chalk.yellow(`Sending back code ${code} output \n` + response));
    cb(false, { code, output: response, stderr });
    console.log(`child process exited with code ${code}`);
  });
});

serv.start(error => {
  if (error) throw error;
  console.log(chalk.blue("Server running ..."));
});
