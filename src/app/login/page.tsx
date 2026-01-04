"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

type ConnectionTarget = "zk205" | "zk203" | "zk201";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [connection, setConnection] = React.useState<ConnectionTarget>("zk205");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // No validation/checking (per your requirement)
    login({ connection, username: username || "admin" });

    // You can choose where to go after "connect":
    router.push("/browse");
  }

  return (
    <div className="px-4 py-8">
      <div className="max-w-lg mx-auto border rounded-lg p-6 bg-white">
        <h1 className="text-xl font-bold">Connect to ZooKeeper</h1>
        <p className="text-sm text-neutral-600 mt-1">
          UI-only login: no checks yet.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Connection string
            </label>
            <select
              className="w-full border rounded px-3 py-2"
              value={connection}
              onChange={(e) => setConnection(e.target.value as ConnectionTarget)}
            >
              <option value="zk205">zk205</option>
              <option value="zk203">zk203</option>
              <option value="zk201">zk201</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Auth username
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Auth password
            </label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded bg-neutral-800 text-white py-2 font-medium hover:opacity-95"
          >
            Connect
          </button>
        </form>
      </div>
    </div>
  );
}
