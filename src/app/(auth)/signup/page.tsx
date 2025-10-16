"use client";
import { useState } from "react";
import { OrDivider } from "@/components/orDivider";
import { FormHeading } from "@/components/auth/FormHeading";
import { SignUpForm } from "@/components/auth/signUpForm";
import { Toaster } from "@/components/ui/sonner";
import { AccountType } from "@/components/auth/accountType";
import { useRouter, useSearchParams } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "@/lib/auth";
import { toast } from "sonner";
import { GoogleOath } from "@/components/auth/googleOath";

export default function SignUp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") ?? "patient";
  const [loading, setLoading] = useState(false);

  const handleGoogleAuthSignUp = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const signUpUser = await signInWithPopup(auth, provider);

      await fetch("/api/auth/role/assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: signUpUser.user.email, role, uid: signUpUser.user.uid }),
      });

      router.push("/signin");
    } catch (error: any) {
      const message = error instanceof Error ? error.message : "Something went wrong";
      toast.error(message, { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster richColors />
      <FormHeading title="Create your account" subtitle="Sign up to get started. It only takes a minute." />
      <AccountType />
      <GoogleOath label={"Sign Up"} onClick={handleGoogleAuthSignUp} loading={loading} />
      <OrDivider />
      <SignUpForm />
    </>
  );
}
