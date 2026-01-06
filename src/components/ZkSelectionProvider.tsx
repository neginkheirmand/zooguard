"use client";

import React from "react";

type SortMode = "az" | "za";

type ZkSelectionContextValue = {
  selectedPath: string;
  setSelectedPath: (path: string) => void;

  refreshTick: number;
  refresh: () => void;

  sortMode: SortMode;
  toggleSort: () => void;
};

const ZkSelectionContext = React.createContext<ZkSelectionContextValue | null>(null);

export function ZkSelectionProvider({ children }: { children: React.ReactNode }) {
  const [selectedPath, setSelectedPath] = React.useState<string>("/");
  const [refreshTick, setRefreshTick] = React.useState(0);

  // default is alphabetical (A→Z)
  const [sortMode, setSortMode] = React.useState<SortMode>("az");

  const refresh = React.useCallback(() => {
    setRefreshTick((t) => t + 1);
  }, []);

  const toggleSort = React.useCallback(() => {
    setSortMode((m) => (m === "az" ? "za" : "az"));
  }, []);

  return (
    <ZkSelectionContext.Provider
      value={{ selectedPath, setSelectedPath, refreshTick, refresh, sortMode, toggleSort }}
    >
      {children}
    </ZkSelectionContext.Provider>
  );
}

export function useZkSelection() {
  const ctx = React.useContext(ZkSelectionContext);
  if (!ctx) throw new Error("useZkSelection must be used within <ZkSelectionProvider>");
  return ctx;
}
