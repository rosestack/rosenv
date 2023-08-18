#!/usr/bin/env node

import { Command } from "commander";

import init from "./commands/init";
import edit from "./commands/edit";
import passcrypt from "./commands/passcrypt";

import util from "util";

util.inspect.defaultOptions.depth = null;
util.inspect.defaultOptions.colors = true;

const commander = new Command();

commander.name("rosenv");

commander.option("--debug", "Enable debug mode");
commander.on("option:debug", () => {
  process.env.DEBUG = "true";
});

commander.addCommand(init);
commander.addCommand(edit);
commander.addCommand(passcrypt);

commander.parse();