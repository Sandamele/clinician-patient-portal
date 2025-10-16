"use client"
import { useRole } from "@/context/RoleContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page () {
  const {role} = useRole();
  const router = useRouter();
  useEffect(() => {
    if (role !== "clinician") router.push("/dashboard");
  },[])
  return (
    <div>
      <h1 className="text-center text-3xl">Patient Lookup</h1>
    </div>
  )
}