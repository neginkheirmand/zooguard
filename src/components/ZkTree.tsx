"use client";

import React from "react";
import type { ZkNode, ZkPath } from "@/lib/zkTypes";

export default function ZkTree({
  root,
  getChildren,
  selectedPath,
  onSelect,
}: {
  root: ZkNode;
  getChildren: (path: ZkPath) => ZkNode[];
  selectedPath: ZkPath;
  onSelect: (path: ZkPath) => void;
}) {
  const [open, setOpen] = React.useState<Record<string, boolean>>({ "/": true });

  function toggle(path: string) {
    setOpen((p) => ({ ...p, [path]: !p[path] }));
  }

  function Row({ node, depth }: { node: ZkNode; depth: number }) {
    const kids = getChildren(node.path);
    const hasKids = kids.length > 0;
    const isOpen = !!open[node.path];
    const active = node.path === selectedPath;

    return (
      <div>
        <div
          className={[
            "flex items-center gap-2 rounded px-2 py-1 cursor-pointer select-none",
            active ? "bg-[var(--color-topbar-2)] text-white" : "hover:bg-black/5",
          ].join(" ")}
          style={{ paddingLeft: 8 + depth * 14 }}
          onClick={() => onSelect(node.path)}
        >
          <button
            type="button"
            className={[
              "h-6 w-6 grid place-items-center rounded",
              hasKids ? "hover:bg-black/10" : "opacity-0 pointer-events-none",
              active ? "hover:bg-white/15" : "",
            ].join(" ")}
            onClick={(e) => {
              e.stopPropagation();
              if (hasKids) toggle(node.path);
            }}
            aria-label={isOpen ? "Collapse" : "Expand"}
          >
            {hasKids ? (isOpen ? "▾" : "▸") : "•"}
          </button>

          <span className="truncate">{node.name}</span>
        </div>

        {hasKids && isOpen && (
          <div className="mt-1">
            {kids.map((k) => (
              <Row key={k.path} node={k} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return <Row node={root} depth={0} />;
}
