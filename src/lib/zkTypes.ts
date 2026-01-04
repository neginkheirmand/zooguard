export type ZkPath = string;

export type ZkStat = {
  version: number;
  dataLength: number;
  numChildren: number;
  ctime: string; // ISO string
  mtime: string; // ISO string
};

export type ZkNode = {
  path: ZkPath;
  name: string;
  data: string;
  stat: ZkStat;
  children: ZkPath[];
};
