import type { ZkNode, ZkPath } from "./zkTypes";

const now = Date.now();
const iso = (minsAgo: number) => new Date(now - minsAgo * 60_000).toISOString();

const NODES: Record<ZkPath, ZkNode> = {
  "/": {
    path: "/",
    name: "rootnode",
    data: "",
    stat: { version: 0, dataLength: 0, numChildren: 3, ctime: iso(10000), mtime: iso(500) },
    children: ["/prod", "/staging", "/shared"],
  },

  "/prod": {
    path: "/prod",
    name: "prod",
    data: "env=prod\nowner=platform\n",
    stat: { version: 3, dataLength: 22, numChildren: 2, ctime: iso(9000), mtime: iso(120) },
    children: ["/prod/config", "/prod/services"],
  },
  "/prod/config": {
    path: "/prod/config",
    name: "config",
    data: `{"featureFlagA": true, "maxConnections": 120}`,
    stat: { version: 9, dataLength: 46, numChildren: 1, ctime: iso(8500), mtime: iso(30) },
    children: ["/prod/config/app"],
  },
  "/prod/config/app": {
    path: "/prod/config/app",
    name: "app",
    data: `port: 8080\nlogLevel: info\n`,
    stat: { version: 12, dataLength: 28, numChildren: 0, ctime: iso(8200), mtime: iso(5) },
    children: [],
  },
  "/prod/services": {
    path: "/prod/services",
    name: "services",
    data: `<services>
  <service name="api" />
  <service name="worker" />
</services>`,
    stat: { version: 1, dataLength: 72, numChildren: 0, ctime: iso(8000), mtime: iso(8000) },
    children: [],
  },

  "/staging": {
    path: "/staging",
    name: "staging",
    data: "env=staging\nowner=platform\n",
    stat: { version: 2, dataLength: 25, numChildren: 1, ctime: iso(7000), mtime: iso(300) },
    children: ["/staging/config"],
  },
  "/staging/config": {
    path: "/staging/config",
    name: "config",
    data: `maxConnections=50\nfeatureFlagA=false\n`,
    stat: { version: 2, dataLength: 37, numChildren: 0, ctime: iso(6900), mtime: iso(200) },
    children: [],
  },

  "/shared": {
    path: "/shared",
    name: "shared",
    data: "",
    stat: { version: 0, dataLength: 0, numChildren: 2, ctime: iso(6000), mtime: iso(6000) },
    children: ["/shared/owners", "/shared/limits"],
  },
  "/shared/owners": {
    path: "/shared/owners",
    name: "owners",
    data: "teamA=alice\nteamB=bob\n",
    stat: { version: 7, dataLength: 24, numChildren: 0, ctime: iso(5900), mtime: iso(70) },
    children: [],
  },
  "/shared/limits": {
    path: "/shared/limits",
    name: "limits",
    data: `{"rateLimit": 1000, "burst": 2000}`,
    stat: { version: 4, dataLength: 38, numChildren: 0, ctime: iso(5800), mtime: iso(10) },
    children: [],
  },
};

export function zkGetNode(path: ZkPath): ZkNode | null {
  return NODES[path] ?? null;
}

export function zkGetChildren(path: ZkPath): ZkNode[] {
  const n = NODES[path];
  if (!n) return [];
  return n.children.map((p) => NODES[p]).filter(Boolean) as ZkNode[];
}
