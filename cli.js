#!/usr/bin/env node

const chalk = require("chalk");
const yargs = require("yargs");

const CommandError = require("./commands/_tools/CommandError");

process.on("unhandledRejection", (err) => {
  throw err;
});

try {
  yargs.commandDir("commands").demandCommand().strict().version(false).argv;
} catch (err) {
  if (err instanceof CommandError) {
    console.error(chalk.red(`Error: ${err.message}`));
    process.exit(1);
  } else {
    throw err;
  }
}
