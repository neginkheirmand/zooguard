"use client";

import React from "react";
import ZkTree from "@/components/ZkTree";
import { zkGetChildren, zkGetNode } from "@/lib/zkMock";

export default function ZkExplorer() {
  const [selectedPath, setSelectedPath] = React.useState<string>("/");

  const root = zkGetNode("/")!;
  const selected = zkGetNode(selectedPath) ?? root;

  return (
    <div className="h-[calc(100vh-64px)] grid grid-cols-12">
      {/* Left: Tree */}
      <aside className="col-span-12 md:col-span-4 lg:col-span-3 border-r border-[var(--color-border)] bg-[var(--color-card)] p-3 overflow-auto">
        <div className="text-sm font-semibold mb-3 text-neutral-900">ZNodes</div>
        <ZkTree
          root={root}
          getChildren={zkGetChildren}
          selectedPath={selected.path}
          onSelect={setSelectedPath}
        />
      </aside>

      {/* Right: Details */}
      <main className="col-span-12 md:col-span-8 lg:col-span-9 p-5 overflow-auto">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-neutral-900">{selected.name}</h2>
              <div className="text-sm text-neutral-700">{selected.path}</div>
              <div className="text-xs text-neutral-600 mt-1">
                v{selected.stat.version} • {selected.stat.numChildren} children • modified{" "}
                {new Date(selected.stat.mtime).toLocaleString()}
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div className="text-sm font-semibold text-neutral-900 mb-2">Data</div>
            <pre className="rounded-lg border border-[var(--color-border)] bg-neutral-50 p-4 text-sm whitespace-pre-wrap text-neutral-900">
              {selected.data || "(empty)"}
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
}
