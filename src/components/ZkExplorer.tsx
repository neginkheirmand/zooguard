"use client";

import React from "react";
import { zkGetChildren, zkGetNode } from "@/lib/zkMock";

function parentPath(path: string): string | null {
  if (path === "/") return null;
  const parts = path.split("/").filter(Boolean);
  if (parts.length <= 1) return "/";
  return "/" + parts.slice(0, -1).join("/");
}

export default function ZkExplorer() {
  // Start at rootnode
  const [selectedPath, setSelectedPath] = React.useState<string>("/");

  const selected = zkGetNode(selectedPath) ?? zkGetNode("/")!;
  const children = zkGetChildren(selected.path);

  const p = parentPath(selected.path);

  return (
    <div className="h-[calc(100vh-64px)] grid grid-cols-12">
      {/* Left: show ONLY direct children of the selected node */}
      <aside className="col-span-12 md:col-span-4 lg:col-span-3 border-r border-[var(--color-border)] bg-[var(--color-card)] p-3 overflow-auto">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="min-w-0">
            <div className="text-xs text-neutral-600">Selected</div>
            <div className="font-semibold text-neutral-900 truncate">{selected.name}</div>
            <div className="text-xs text-neutral-600 truncate">{selected.path}</div>
          </div>

          <button
            type="button"
            className="px-3 py-1.5 rounded border border-[var(--color-border)] text-sm bg-white hover:bg-neutral-50 disabled:opacity-50"
            disabled={!p}
            onClick={() => p && setSelectedPath(p)}
            title="Go to parent"
          >
            Up
          </button>
        </div>

        <div className="text-sm font-semibold mb-2 text-neutral-900">Children</div>

        {children.length === 0 ? (
          <div className="text-sm text-neutral-600">(no children)</div>
        ) : (
          <div className="space-y-2">
            {children.map((c) => (
              <button
                key={c.path}
                type="button"
                onClick={() => setSelectedPath(c.path)}
                className="w-full text-left px-3 py-2 rounded border border-[var(--color-border)] bg-white hover:bg-neutral-50"
              >
                <div className="font-medium text-neutral-900">{c.name}</div>
                <div className="text-xs text-neutral-600 truncate">{c.path}</div>
              </button>
            ))}
          </div>
        )}
      </aside>

      {/* Right: details of the selected node */}
      <main className="col-span-12 md:col-span-8 lg:col-span-9 p-5 overflow-auto">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5">
          <h2 className="text-lg font-bold text-neutral-900">{selected.name}</h2>
          <div className="text-sm text-neutral-700">{selected.path}</div>

          <div className="text-xs text-neutral-600 mt-1">
            v{selected.stat.version} • {selected.stat.numChildren} children • modified{" "}
            {new Date(selected.stat.mtime).toLocaleString()}
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
