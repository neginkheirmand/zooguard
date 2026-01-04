"use client";

import React from "react";

type ConnectionTarget = "zk205" | "zk203" | "zk201";

type AuthState = {
  loggedIn: boolean;
  connection?: ConnectionTarget;
  username?: string;
};

type AuthContextValue = {
  state: AuthState;
  login: (input: { connection: ConnectionTarget; username: string }) => void;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<AuthState>({ loggedIn: false });

  // Optional: persist across refresh
  React.useEffect(() => {
    const raw = localStorage.getItem("zooguard-auth");
    if (raw) setState(JSON.parse(raw));
  }, []);

  React.useEffect(() => {
    localStorage.setItem("zooguard-auth", JSON.stringify(state));
  }, [state]);

  const login: AuthContextValue["login"] = ({ connection, username }) => {
    setState({ loggedIn: true, connection, username });
  };

  const logout: AuthContextValue["logout"] = () => {
    setState({ loggedIn: false });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
