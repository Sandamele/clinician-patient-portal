"use client";
import { ReactNode, useEffect } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/ui/loader";
import { Navigation } from "@/components/navigation";
import { Theme } from "@/components/theme";


export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [loading, user, router]);

  if (loading) return <Loader />;

  return (
    <div>
      <Navigation />
      <div className="mx-6">{children}</div>
      <div className="fixed bottom-4 right-4">
        <Theme />
      </div>
    </div>
  );
}
