export type ZkNodeResponse = {
  cluster: string;
  path: string;
  data: string;
  stat: {
    version: number;
    dataLength: number;
    numChildren: number;
    ctime: number; // epoch millis (from gateway)
    mtime: number; // epoch millis (from gateway)
  };
};

export type ZkChildrenResponse = {
  cluster: string;
  path: string;
  children: string[]; // full paths
};

export async function apiGetChildren(cluster: string, path: string) {
  const res = await fetch(
    `/api/zk/children?cluster=${encodeURIComponent(cluster)}&path=${encodeURIComponent(path)}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error(await res.text());
  return (await res.json()) as ZkChildrenResponse;
}

export async function apiGetNode(cluster: string, path: string) {
  const res = await fetch(
    `/api/zk/node?cluster=${encodeURIComponent(cluster)}&path=${encodeURIComponent(path)}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error(await res.text());
  return (await res.json()) as ZkNodeResponse;
}
