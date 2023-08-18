import prompts from "prompts";

import { createCommand } from "commander";

import Passcrypt from "~/shared/passcrypt";

const passcrypt = createCommand("passcrypt");

passcrypt.description("passcrypt utility");

passcrypt.action(async () => {
  const { operation } = await prompts({
    message: "select passcrypt operation",
    name: "operation",
    type: "select",
    choices: [
      {
        selected: true,
        title: "create passcrypt",
        value: "create",
      },
      {
        title: "import passcrypt",
        value: "import",
      },
      {
        title: "export passcrypt",
        value: "export",
      },
    ],
  });

  if ( operation === "create" ) {
    const { password } = await prompts({
      message: "enter password",
      name: "password",
      type: "password",
    });

    return Passcrypt.set(password);
  }

  if ( operation === "import" ) {
    const { passcrypt } = await prompts({
      message: "enter passcrypt",
      name: "passcrypt",
      type: "text",
    });

    return Passcrypt.import(passcrypt);
  }

  if ( operation === "export" ) {
    const passcrypt = Passcrypt.export();

    if ( passcrypt ) {
      return console.log(passcrypt);
    }

    return console.log("no passcrypt found");
  }
});

export default passcrypt;