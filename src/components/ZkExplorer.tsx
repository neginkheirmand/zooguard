"use client";

import React from "react";
import { zkGetChildren, zkGetNode } from "@/lib/zkMock";
import { useZkSelection } from "@/components/ZkSelectionProvider";

import { useAuth } from "@/components/AuthProvider";
import { apiGetChildren, apiGetNode } from "@/lib/zkHttp";

function parentPath(path: string): string | null {
  if (path === "/") return null;
  const parts = path.split("/").filter(Boolean);
  if (parts.length <= 1) return "/";
  return "/" + parts.slice(0, -1).join("/");
}
function nameFromPath(path: string) {
  if (path === "/") return "rootnode";
  const parts = path.split("/").filter(Boolean);
  return parts[parts.length - 1] ?? "rootnode";
}


export default function ZkExplorer() {
  const { state } = useAuth();
  const cluster = state.connection ?? "zk205";

  const { selectedPath, setSelectedPath, refreshTick } = useZkSelection();
  const [query, setQuery] = React.useState("");

  const [children, setChildren] = React.useState<{ path: string; name: string }[]>([]);
  const [data, setData] = React.useState<string>("");
  const [stat, setStat] = React.useState<{
    version: number;
    dataLength: number;
    numChildren: number;
    ctime: number;
    mtime: number;
  } | null>(null);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const p = parentPath(selectedPath);

  React.useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const [kidsRes, nodeRes] = await Promise.all([
          apiGetChildren(cluster, selectedPath),
          apiGetNode(cluster, selectedPath),
        ]);

        if (cancelled) return;

        setChildren(
          kidsRes.children.map((path) => ({ path, name: nameFromPath(path) }))
        );
        setData(nodeRes.data ?? "");
        setStat(nodeRes.stat ?? null);
      } catch (e: any) {
        if (cancelled) return;
        setError(typeof e?.message === "string" ? e.message : "Failed to load");
        setChildren([]);
        setData("");
        setStat(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [cluster, selectedPath, refreshTick]);

  const filteredChildren = children.filter((c) =>
    c.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-64px)] grid grid-cols-12">
      <aside className="col-span-12 md:col-span-4 lg:col-span-3 border-r border-[var(--color-border)] bg-[var(--color-card)] p-3 overflow-auto">
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

        {loading && <div className="text-sm text-neutral-600">Loading...</div>}
        {error && (
          <div className="text-sm text-red-700 border border-red-200 bg-red-50 rounded p-2 mb-2">
            {error}
          </div>
        )}

        {!loading && !error && children.length === 0 ? (
          <div className="text-sm text-neutral-600">(no children)</div>
        ) : !loading && !error && filteredChildren.length === 0 ? (
          <div className="text-sm text-neutral-600">(no matches)</div>
        ) : (
          <div className="space-y-2">
            {filteredChildren.map((c) => (
              <button
                key={c.path}
                type="button"
                onClick={() => {
                  setSelectedPath(c.path);
                  setQuery("");
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

      <main className="col-span-12 md:col-span-8 lg:col-span-9 p-5 overflow-auto">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5">
          <h2 className="text-lg font-bold text-neutral-900">{nameFromPath(selectedPath)}</h2>
          <div className="text-sm text-neutral-700">{selectedPath}</div>

          <div className="text-xs text-neutral-600 mt-1">
            {stat ? (
              <>
                v{stat.version} • {stat.numChildren} children • modified{" "}
                {new Date(stat.mtime).toLocaleString()}
              </>
            ) : (
              "—"
            )}
          </div>

          <div className="mt-5">
            <div className="text-sm font-semibold text-neutral-900 mb-2">Data</div>
            <pre className="rounded-lg border border-[var(--color-border)] bg-neutral-50 p-4 text-sm whitespace-pre-wrap text-neutral-900">
              {data || "(empty)"}
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
}
