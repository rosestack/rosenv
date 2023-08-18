interface File {
  name: string;
  content: string;
}

interface RosenvConfig {
  version: string;
  scripts?: File[];
  envs?: File[];
}

export type {
  RosenvConfig,
};