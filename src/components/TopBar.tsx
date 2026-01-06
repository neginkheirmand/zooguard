"use client";

import Link from "next/link";
import React from "react";
import { useAuth } from "@/components/AuthProvider";
import { useZkSelection } from "@/components/ZkSelectionProvider";
import { apiCreateNode } from "@/lib/zkHttp";

function IconButton({
  label,
  children,
  onClick,
  disabled,
}: {
  label: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className="p-2 rounded hover:bg-white/10 active:bg-white/15 disabled:opacity-50 disabled:hover:bg-transparent"
    >
      {children}
    </button>
  );
}


/** Icons (simple inline SVGs so you don't need a library) */
function DoorIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M7 3h10v18H7V3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M7 21H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M19 21h-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="14.5" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

function ToggleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M4 7h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="9" cy="7" r="2" fill="currentColor" />
      <circle cx="15" cy="17" r="2" fill="currentColor" />
    </svg>
  );
}

function SortIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M8 7h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 12h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 17h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M6 6v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M6 18l-2-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M6 18l2-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function KebabIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <circle cx="12" cy="6" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="12" cy="18" r="1.8" />
    </svg>
  );
}

function RefreshIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M20 12a8 8 0 1 1-2.34-5.66"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20 4v6h-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HomeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M3 11.5 12 4l9 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 10.5V20h11V10.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function TopBar() {
  const { state, logout } = useAuth();
  const { selectedPath, setSelectedPath, refresh, sortMode, toggleSort } = useZkSelection();

  const cluster = state.connection ?? "zk205";

  async function handleCreateZnode() {
    if (!state.loggedIn) return;

    const name = window.prompt("Enter child znode name:", "newNode");
    if (!name) return;

    const trimmed = name.trim();
    if (!trimmed || trimmed.includes("/")) {
      window.alert("Invalid name. Use a single segment name (no '/').");
      return;
    }

    const newPath = selectedPath === "/" ? `/${trimmed}` : `${selectedPath}/${trimmed}`;
    const data = window.prompt("Initial data (optional):", "") ?? "";

    try {
      await apiCreateNode(cluster, { path: newPath, data, createParents: true });
      setSelectedPath(newPath); // go to the new node
      refresh(); // reload children + node data
    } catch (e: any) {
      window.alert(`Create failed: ${e?.message ?? "Unknown error"}`);
    }
  }

  return (
    <div>
      {/* Top bar */}
      <header className="bg-[var(--color-topbar)] text-white">
        <div className="w-full flex items-center justify-between py-4 px-4">
            {/* LEFT: title + connection (when logged in) */}
            <div className="flex items-center gap-3 min-w-0">
            <Link
                href="/"
                className="text-2xl font-extrabold tracking-tight hover:opacity-90 shrink-0"
            >
                ZooGuard
            </Link>

            {state.loggedIn && state.connection && (
                <span className="text-xs font-semibold px-2 py-1 rounded bg-white/15 border border-white/20">
                {state.connection}
                </span>
            )}
            </div>

            {/* RIGHT: username (when logged in) + door */}
            <div className="flex items-center gap-3">
            {state.loggedIn && state.username && (
                <span className="text-sm font-medium opacity-95">
                {state.username}
                </span>
            )}

            {!state.loggedIn ? (
                <Link
                href="/login"
                className="p-2 rounded hover:bg-white/10"
                aria-label="Log in"
                title="Log in"
                >
                <DoorIcon className="h-6 w-6" />
                </Link>
            ) : (
                <button
                type="button"
                className="p-2 rounded hover:bg-white/10"
                aria-label="Log out"
                title="Log out"
                onClick={logout}
                >
                <DoorIcon className="h-6 w-6" />
                </button>
            )}
            </div>
        </div>
    </header>


      {/* Second bar (only when logged in) */}
      {state.loggedIn && (
        <div className="bg-[var(--color-topbar-2)] text-white border-b border-white/10">
          {/* IMPORTANT:
              This grid matches your explorer layout (12 cols),
              so the separator aligns with the left sidebar boundary. */}
          <div className="grid grid-cols-12 items-center">
            {/* Left section: same width as sidebar */}
            <div className="col-span-12 md:col-span-4 lg:col-span-3 flex items-center gap-1 px-2 py-2 border-r border-white/15">
              <IconButton label="Toggle Select">
                <ToggleIcon className="h-5 w-5" />
              </IconButton>

              <IconButton
                label={sortMode === "az" ? "Sort A→Z (click for Z→A)" : "Sort Z→A (click for A→Z)"}
                onClick={toggleSort}
              >
                <SortIcon className="h-5 w-5" />
              </IconButton>


              <IconButton label="Create ZNode" onClick={handleCreateZnode}>
                <PlusIcon className="h-5 w-5" />
              </IconButton>

            </div>

            {/* Right section: rest of the bar */}
            <div className="col-span-12 md:col-span-8 lg:col-span-9 flex items-center gap-1 px-2 py-2">
              <IconButton label="More">
                <KebabIcon className="h-5 w-5" />
              </IconButton>

              <button
                type="button"
                aria-label="Refresh"
                title="Refresh"
                className="p-2 rounded hover:bg-white/10 active:bg-white/15"
                onClick={refresh}
              >
                <RefreshIcon className="h-5 w-5" />
              </button>


              <button
                type="button"
                aria-label="Home"
                title="Home"
                className="p-2 rounded hover:bg-white/10 active:bg-white/15"
                onClick={() => setSelectedPath("/")}
              >
                <HomeIcon className="h-5 w-5" />
              </button>


              {/* Path display area */}
              <div className="ml-2 text-sm font-medium opacity-95 truncate">
                {selectedPath}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
