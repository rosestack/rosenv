import { rosenv } from "~/shared/consts";

import path from "path";
import fs from "fs";
import os from "os";

const rosenvDir = () => {
  const platform = os.platform();

  let appData: string;

  if ( platform === "win32" ) {
    if ( process.env.APPDATA ) {
      appData = process.env.APPDATA;
    } else {
      appData = path.join(os.homedir(), "AppData", "Roaming");
    }
  } else if ( platform === "darwin" ) {
    appData = path.join(os.homedir(), "Library", "Preferences");
  } else {
    appData = path.join(os.homedir(), ".config");
  }

  const rosenvDir = path.join(appData, rosenv);

  if ( !fs.existsSync(rosenvDir) ) {
    fs.mkdirSync(rosenvDir, {
      recursive: true,
    });
  }

  return rosenvDir;
};

export {
  rosenvDir,
};