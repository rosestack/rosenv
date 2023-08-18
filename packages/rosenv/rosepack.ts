import { defineRosepack } from "rosepack";

export default defineRosepack({
  defineRuntime: {
    version: true,
  },
  entry: {
    bin: {
      input: "lib/bin/index.ts",
      format: [
        "esm",
      ],
    },
    rosenv: "lib/rosenv/index.ts",
  },
  output: {
    format: [
      "esm",
      "cjs",
    ],
    entryName: "[name].[format].js",
    chunkName: "[hash].[format].js",
    esm: {
      shims: true,
    },
  },
  declaration: {
    entry: {
      rosenv: "lib/rosenv/index.ts",
    },
  },
  clean: true,
});