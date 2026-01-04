"use client";

import React from "react";

type Node = {
  name: string;
  path: string;
  data: string;
};

const MOCK_NODES: Node[] = [
  {
    name: "rootnode",
    path: "/rootnode",
    data: "Hello from ZooGuard (mock znode data)",
  },
];

export default function ZkExplorerSimple() {
  const [selectedPath, setSelectedPath] = React.useState(MOCK_NODES[0].path);
  const selected = MOCK_NODES.find((n) => n.path === selectedPath) ?? MOCK_NODES[0];

  return (
    <div className="h-[calc(100vh-64px)] grid grid-cols-12">
      {/* Left znode explorer */}
      <aside className="col-span-12 md:col-span-4 lg:col-span-3 border-r p-3">
        <div className="text-sm font-semibold mb-3">ZNodes</div>

        {MOCK_NODES.map((n) => {
          const active = n.path === selectedPath;
          return (
            <button
              key={n.path}
              type="button"
              onClick={() => setSelectedPath(n.path)}
              className={[
                "w-full text-left px-3 py-2 rounded border mb-2",
                active ? "bg-neutral-800 text-white border-neutral-800" : "bg-white hover:bg-neutral-50",
              ].join(" ")}
            >
              {n.name}
              <div className={["text-xs mt-1", active ? "text-white/80" : "text-neutral-500"].join(" ")}>
                {n.path}
              </div>
            </button>
          );
        })}
      </aside>

      {/* Right details */}
      <main className="col-span-12 md:col-span-8 lg:col-span-9 p-5">
        <h2 className="text-lg font-semibold">{selected.name}</h2>
        <div className="text-sm text-neutral-600">{selected.path}</div>

        <div className="mt-4">
          <div className="text-sm font-medium mb-2">Data</div>
          <pre className="p-4 rounded border bg-neutral-50 text-sm whitespace-pre-wrap">
            {selected.data}
          </pre>
        </div>
      </main>
    </div>
  );
}
