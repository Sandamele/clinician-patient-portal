"use client";

import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { setCookie, deleteCookie, getCookie } from "cookies-next";
import { AuthContextType, User } from "@/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getCookie("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser as string));
      } catch {
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const signIn = (user: User) => {
    setCookie("user", JSON.stringify(user), { maxAge: 60 * 60 * 24, path: "/" });
    setUser(user);
  };

  const signOut = () => {
    deleteCookie("user", { path: "/" });
    setUser(null);
  };

  const isAuthenticated = () => !!user;

  const hasRole = (role: string) => user?.role === role;

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isAuthenticated, hasRole, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
