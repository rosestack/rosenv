import { loadEnv } from "rosenv";

await loadEnv();

const start = () => {
  console.log("start");
};

start();