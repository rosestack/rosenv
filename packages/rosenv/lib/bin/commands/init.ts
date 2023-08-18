import { createCommand } from "commander";

import { rosenv } from "~/shared/consts";

import type { RosenvConfig } from "~/types";

import path from "path";
import fs from "fs";
import Passcrypt from "~/shared/passcrypt";

const init = createCommand("init");

init.description("init utility");

init.action(() => {
  const rosenvFile = path.join(process.cwd(), rosenv);

  fs.rmSync(rosenvFile, {
    force: true,
  });

  if ( fs.existsSync(rosenvFile) ) {
    return console.log("rosenv already initialized");
  }

  const rosenvConfig: RosenvConfig = {
    version: process.env.VERSION,
    scripts: [],
    envs: [],
  };

  const dotEnv = path.join(process.cwd(), ".env");

  if ( fs.existsSync(dotEnv) ) {
    const decoded = fs.readFileSync(dotEnv, "utf8");

    const passcrypt = new Passcrypt();

    rosenvConfig.envs?.push({
      name: path.basename(dotEnv),
      content: passcrypt.encrypt(decoded),
    });
  }

  fs.writeFileSync(rosenvFile, JSON.stringify(rosenvConfig, null, 2));
});

export default init;