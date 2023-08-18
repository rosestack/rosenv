import { defineRosepack } from "rosepack";

export default defineRosepack({
  external: ["rosenv"],
  entry: "source/index.ts",
  clean: true,
});