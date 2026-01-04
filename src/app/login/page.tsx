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
    login({ connection, username: username || "admin" });
    router.push("/browse");
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-neutral-100 px-4 py-10">
      <div className="mx-auto w-full max-w-lg rounded-xl border border-neutral-300 bg-white shadow-sm">
        <div className="border-b border-neutral-200 px-6 py-5">
          <h1 className="text-2xl font-bold text-neutral-900">Connect</h1>
          <p className="mt-1 text-sm text-neutral-700">
            Enter connection details to access ZooKeeper (UI-only for now).
          </p>
        </div>

        <form onSubmit={onSubmit} className="px-6 py-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-neutral-900 mb-2">
              Connection string
            </label>
            <select
              className="w-full rounded-lg border border-neutral-400 bg-white px-3 py-2 text-neutral-900 outline-none focus:border-neutral-800 focus:ring-2 focus:ring-neutral-300"
              value={connection}
              onChange={(e) => setConnection(e.target.value as ConnectionTarget)}
            >
              <option value="zk205">zk205</option>
              <option value="zk203">zk203</option>
              <option value="zk201">zk201</option>
            </select>
            <p className="mt-2 text-xs text-neutral-700">
              Choose which cluster to connect to.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-900 mb-2">
              Auth username
            </label>
            <input
              className="w-full rounded-lg border border-neutral-400 bg-white px-3 py-2 text-neutral-900 placeholder:text-neutral-500 outline-none focus:border-neutral-800 focus:ring-2 focus:ring-neutral-300"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin"
              autoComplete="username"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-900 mb-2">
              Auth password
            </label>
            <input
              type="password"
              className="w-full rounded-lg border border-neutral-400 bg-white px-3 py-2 text-neutral-900 placeholder:text-neutral-500 outline-none focus:border-neutral-800 focus:ring-2 focus:ring-neutral-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-neutral-800 px-4 py-2.5 font-semibold text-white hover:bg-neutral-900"
          >
            Connect
          </button>

          <div className="text-xs text-neutral-700">
            No validation yet — clicking <span className="font-semibold">Connect</span> logs you in.
          </div>
        </form>
      </div>
    </div>
  );
}
