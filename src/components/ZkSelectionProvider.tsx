"use client";

import React from "react";

type ZkSelectionContextValue = {
  selectedPath: string;
  setSelectedPath: (path: string) => void;

  /** increments to force reloads without changing the selectedPath */
  refreshTick: number;
  refresh: () => void;
};

const ZkSelectionContext = React.createContext<ZkSelectionContextValue | null>(null);

export function ZkSelectionProvider({ children }: { children: React.ReactNode }) {
  const [selectedPath, setSelectedPath] = React.useState<string>("/");
  const [refreshTick, setRefreshTick] = React.useState(0);

  const refresh = React.useCallback(() => {
    setRefreshTick((t) => t + 1);
  }, []);

  return (
    <ZkSelectionContext.Provider value={{ selectedPath, setSelectedPath, refreshTick, refresh }}>
      {children}
    </ZkSelectionContext.Provider>
  );
}

export function useZkSelection() {
  const ctx = React.useContext(ZkSelectionContext);
  if (!ctx) throw new Error("useZkSelection must be used within <ZkSelectionProvider>");
  return ctx;
}
