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

export async function apiCreateNode(
  cluster: string,
  input: { path: string; data?: string; createParents?: boolean }
) {
  const res = await fetch(`/api/zk/node?cluster=${encodeURIComponent(cluster)}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      path: input.path,
      data: input.data ?? "",
      createParents: input.createParents ?? true,
    }),
  });

  if (!res.ok) throw new Error(await res.text());
  return (await res.json()) as { cluster: string; path: string; created: boolean };
}
