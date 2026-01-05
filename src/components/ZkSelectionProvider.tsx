"use client";

import React from "react";

type ZkSelectionContextValue = {
  selectedPath: string;
  setSelectedPath: (path: string) => void;
};

const ZkSelectionContext = React.createContext<ZkSelectionContextValue | null>(null);

export function ZkSelectionProvider({ children }: { children: React.ReactNode }) {
  const [selectedPath, setSelectedPath] = React.useState<string>("/");

  return (
    <ZkSelectionContext.Provider value={{ selectedPath, setSelectedPath }}>
      {children}
    </ZkSelectionContext.Provider>
  );
}

export function useZkSelection() {
  const ctx = React.useContext(ZkSelectionContext);
  if (!ctx) throw new Error("useZkSelection must be used within <ZkSelectionProvider>");
  return ctx;
}
