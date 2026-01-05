"use client";

import React from "react";
import { zkGetChildren, zkGetNode } from "@/lib/zkMock";
import { useZkSelection } from "@/components/ZkSelectionProvider";

function parentPath(path: string): string | null {
  if (path === "/") return null;
  const parts = path.split("/").filter(Boolean);
  if (parts.length <= 1) return "/";
  return "/" + parts.slice(0, -1).join("/");
}

export default function ZkExplorer() {
  const { selectedPath, setSelectedPath } = useZkSelection();
  const [query, setQuery] = React.useState("");

  const selected = zkGetNode(selectedPath) ?? zkGetNode("/")!;
  const children = zkGetChildren(selected.path);

  const p = parentPath(selected.path);

  const filteredChildren = children.filter((c) =>
    c.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-64px)] grid grid-cols-12">
      {/* Left: direct children of selected node */}
      <aside className="col-span-12 md:col-span-4 lg:col-span-3 border-r border-[var(--color-border)] bg-[var(--color-card)] p-3 overflow-auto">
        {/* Search + Up */}
        <div className="flex items-center gap-2 mb-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search children..."
            className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-500 outline-none focus:ring-2 focus:ring-black/10"
          />

          <button
            type="button"
            className="shrink-0 px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm bg-white hover:bg-neutral-50 disabled:opacity-50"
            disabled={!p}
            onClick={() => p && setSelectedPath(p)}
            title="Go to parent"
          >
            Up
          </button>
        </div>

        {/* Children list (filtered) */}
        {children.length === 0 ? (
          <div className="text-sm text-neutral-600">(no children)</div>
        ) : filteredChildren.length === 0 ? (
          <div className="text-sm text-neutral-600">(no matches)</div>
        ) : (
          <div className="space-y-2">
            {filteredChildren.map((c) => (
              <button
                key={c.path}
                type="button"
                onClick={() => {
                  setSelectedPath(c.path);
                  setQuery(""); // optional: clear search when you navigate
                }}
                className="w-full text-left px-3 py-2 rounded border border-[var(--color-border)] bg-white hover:bg-neutral-50"
              >
                <div className="font-medium text-neutral-900">{c.name}</div>
                <div className="text-xs text-neutral-600 truncate">{c.path}</div>
              </button>
            ))}
          </div>
        )}
      </aside>

      {/* Right: details */}
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
