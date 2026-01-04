"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import ZkExplorerSimple from "@/components/ZkExplorerSimple";

export default function BrowseGate() {
  const { state } = useAuth();

  if (!state.loggedIn) {
    return (
      <div className="p-6">
        <div className="max-w-lg border rounded p-5 bg-white">
          <h1 className="text-lg font-semibold">Not connected</h1>
          <p className="text-sm text-neutral-600 mt-1">
            Please connect first to view ZooKeeper data.
          </p>
          <Link
            href="/login"
            className="inline-block mt-4 px-4 py-2 rounded bg-neutral-800 text-white hover:opacity-95"
          >
            Go to Connect Page
          </Link>
        </div>
      </div>
    );
  }

  return <ZkExplorerSimple />;
}
