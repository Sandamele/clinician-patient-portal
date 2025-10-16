"use client"
import { Loader } from "@/components/ui/loader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/signin");
  },[])
  return (
    <div>
      <Loader />
    </div>
  );
}
