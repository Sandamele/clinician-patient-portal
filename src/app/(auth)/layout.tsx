"use client";
import Head from "next/head";
import { Theme } from "@/components/theme";
import { Card } from "@/components/ui/card";
import { Suspense } from "react";
import { Loader } from "@/components/ui/loader";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid place-items-center relative bg-background">
      <Head>
        <title>Clinicians & Patient Portal: Authentication</title>
      </Head>
      <div className="absolute top-4 right-4">
        <Theme />
      </div>
      <Suspense fallback={<Loader />}>
        <Card className="w-[450px]  px-6 pt-8">{children}</Card>
      </Suspense>
    </div>
  );
}
