import { createCommand } from "commander";

import { rosenv } from "~/shared/consts";

import path from "path";
import fs from "fs";

const edit = createCommand("edit");

edit.description("edit rosenv");

edit.action(() => {
  const rosenvFile = path.join(process.cwd(), rosenv);

  if ( !fs.existsSync(rosenvFile) ) {
    return console.log("rosenv is not initialized");
  }

  console.log("edit");
});

export default edit;