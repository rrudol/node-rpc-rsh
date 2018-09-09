#!/usr/bin/env node

const rpc = require("node-json-rpc");
const chalk = require("chalk");

const config = {
  port: 5433,
  host: process.argv[2],
  path: "/"
};

const client = new rpc.Client(config);

function rsh(command, input) {
  command = Buffer.from(command, "utf8");
  input = Buffer.from(input, "utf8");
  function callback(_, data) {
    if (!data) {
      console.log(chalk.red(`No output recived`));
      process.exit(0);
    }
    const { result, error } = data;
    if (error) {
      console.log(
        chalk.red(`Error occured: ${chalk.bold(error)}`, JSON.stringify(data))
      );
      process.exit(0);
    }
    if (!result.code) {
      console.log(chalk.green(`Procedure Execuded Succesfully:`));
    } else {
      console.log(chalk.magenta(`Procedure exited with code ${result.code}:`));
    }
    console.log(result.output);
    if (result.stderr) {
      console.log("Got also some error messages:");
      console.log(chalk.red(result.stderr));
    }
    process.exit(0);
  }
  client.call(
    { jsonrpc: "2.0", method: "sh", params: { command, input }, id: 0 },
    callback
  );
}

let data = "";
const command = process.argv.slice(3).join(" ");

console.log(
  chalk.blue(
    `Sending Remote Procedure Command '${chalk.bold(command)}' to '${chalk.bold(
      config.host
    )}'`
  )
);

process.stdin.setEncoding("utf8");

setTimeout(() => rsh(command, ""), 100);

process.stdin.on("data", chunk => {
  // clearTimeout(timeout);
  data += chunk;
});

process.stdin.on("end", () => {
  rsh(command, data);
});
