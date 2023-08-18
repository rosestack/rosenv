import { rosenvDir } from "~/shared/utils";

import crypto from "crypto";
import path from "path";
import fs from "fs";

class Passcrypt {
  static path = path.join(rosenvDir(), "passcrypt");

  //

  static encode = (crypto: string) => {
    return Buffer.from(JSON.stringify(crypto)).toString("base64");
  };

  static decode = (crypto: string) => {
    return JSON.parse(Buffer.from(crypto, "base64").toString("utf8"));
  };

  //

  static set(password: string) {
    const salt = crypto.randomBytes(16);

    const iterations = 10000;
    const keyLength = 32;
    const ivLength = 16;

    const pbkdf2Sync = crypto.pbkdf2Sync(password, salt, iterations, keyLength + ivLength, "sha512");

    const key = pbkdf2Sync.slice(0, keyLength);
    const iv = pbkdf2Sync.slice(keyLength, keyLength + ivLength);

    fs.writeFileSync(Passcrypt.path, Passcrypt.encode(`${ key.toString("hex") }:${ iv.toString("hex") }`), {
      encoding: "utf8",
    });
  }

  static get() {
    if ( fs.existsSync(Passcrypt.path) ) {
      const [ key, iv ] = Passcrypt.decode(fs.readFileSync(Passcrypt.path, "utf8")).split(":");

      if ( !key || !iv ) {
        return null;
      }

      return {
        key: Buffer.from(key, "hex"),
        iv: Buffer.from(iv, "hex"),
      };
    }

    return null;
  }

  static import(crypto: string) {
    return fs.writeFileSync(Passcrypt.path, crypto, {
      encoding: "utf8",
    });
  }

  static export() {
    if ( fs.existsSync(Passcrypt.path) ) {
      return fs.readFileSync(Passcrypt.path, "utf8");
    }

    return null;
  }

  //

  key: Buffer;
  iv: Buffer;

  constructor() {
    const passcrypt = Passcrypt.get();

    if ( !passcrypt ) {
      throw new Error("passcrypt not set");
    }

    this.key = passcrypt.key;
    this.iv = passcrypt.iv;
  }

  cipher: crypto.Cipher;

  encrypt(text: string) {
    this.cipher = crypto.createCipheriv("aes-256-cbc", this.key, this.iv);
    return this.cipher.update(text, "utf8", "hex") + this.cipher.final("hex");
  }

  decipher: crypto.Decipher;

  decrypt(text: string) {
    this.decipher = crypto.createDecipheriv("aes-256-cbc", this.key, this.iv);
    return this.decipher.update(text, "hex", "utf8") + this.decipher.final("utf8");
  }
}

export default Passcrypt;