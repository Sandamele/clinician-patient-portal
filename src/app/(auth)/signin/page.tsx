"use client";
import { FormHeading } from "@/components/auth/FormHeading";
import { GoogleOath } from "@/components/auth/googleOath";
import { OrDivider } from "@/components/orDivider";
import { SignInForm } from "@/components/auth/signinForm";
import { toast, Toaster } from "sonner";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "@/lib/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types";
import { useAuth } from "@/context/authContext";
import { getLastChars } from "@/lib/helper";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signIn } = useAuth();
  const handleGoogleAuthSignIn = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const signInUser = await signInWithPopup(auth, provider);
      const idToken = await signInUser.user.getIdToken();

      // Fetch user's role
      const roleResponse = await fetch(`/api/auth/role?id=${signInUser.user.uid}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!roleResponse.ok) {
        throw new Error("Failed to fetch user role");
      }

      const roleData = await roleResponse.json(); // Parse JSON
      const role = roleData.role;

      const user: User = {
        email: signInUser.user.email || "",
        avatar: signInUser.user.photoURL || "",
        id: signInUser.user.uid,
        idToken: getLastChars(idToken, 10),
        role,
      };

      localStorage.setItem("role", JSON.stringify(role));
      signIn(user);
      router.push("/dashboard");
    } catch (error: any) {
      const message = error instanceof Error ? error.message : "Something went wrong";
      toast.error(message, { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <FormHeading title="Welcome Back" subtitle="Sign in to continue to your account" />
      <GoogleOath label="Sign In" onClick={handleGoogleAuthSignIn} loading={loading} />
      <OrDivider />
      <SignInForm />
      <Toaster richColors />
    </>
  );
}
