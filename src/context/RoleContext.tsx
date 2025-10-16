"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { RoleContextType } from "@/types";

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<string>("");

  useEffect(() => {
    const storedRole = localStorage.getItem("role") || role;
    setRoleState(storedRole);
  }, []);

  const setRole = (newRole: string) => {
    localStorage.setItem("role", newRole);
    setRoleState(newRole);
  };

  return <RoleContext.Provider value={{ role, setRole }}>{children}</RoleContext.Provider>;
}

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) throw new Error("useRole must be used within a RoleProvider");
  return context;
};
