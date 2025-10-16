"use client";
import { useAuth } from "@/context/authContext";

export function Welcome() {
  const { user } = useAuth();
  return (
    <h1 className="text-2xl font-bold mt-4 mb-6 border-b-2 border-slate-300 py-2 shadow px-3">
      Welcome, {user?.email}
    </h1>
  );
}
