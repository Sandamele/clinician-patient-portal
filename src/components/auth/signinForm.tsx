import { Form, Formik } from "formik";
import { FormField } from "@/components/formField";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import auth from "@/lib/auth";
import { signInSchema } from "@/schema/signin.schema";
import Link from "next/link";
import { User } from "@/types";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { getLastChars } from "@/lib/helper";

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const initialValues = {
    email: "",
    password: "",
  };
  const { signIn } = useAuth();
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (
    values: { email: string; password: string },
    { resetForm, setSubmitting }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    try {
      const signInUser = await signInWithEmailAndPassword(auth, values.email.toLowerCase().trim(), values.password);
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
      toast.error(error.message || "Something went wrong", { position: "top-center" });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Formik initialValues={initialValues} validationSchema={signInSchema} onSubmit={handleSubmit}>
      {({ errors, touched, handleChange, handleBlur, isSubmitting }) => (
        <Form>
          <FormField label={"Email"} htmlFor={"email"} error={errors.email} touched={touched.email} className="mt-4">
            <Input
              type="text"
              placeholder="Enter your email"
              name="email"
              id="email"
              autoComplete="email"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormField>
          <FormField
            label={"Password"}
            htmlFor={"password"}
            error={errors.password}
            touched={touched.password}
            className="mt-4"
          >
            <InputGroup>
              <InputGroupInput
                type={showPassword ? "text" : "password"}
                placeholder="Enter your confirm Password"
                name="password"
                id="password"
                autoComplete="new-password"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <InputGroupAddon align="inline-end" className="cursor-pointer">
                {showPassword ? <EyeOff onClick={handleTogglePassword} /> : <Eye onClick={handleTogglePassword} />}
              </InputGroupAddon>
            </InputGroup>
          </FormField>
          <Button type="submit" className="mt-4 w-full cursor-pointer" disabled={isSubmitting}>
            {!isSubmitting ? "Sign In" : <Spinner />}
          </Button>
          <p className="pt-2 text-center">
            Don't have account?{" "}
            <Link href="/signup" className="text-blue-900">
              Sign Up
            </Link>{" "}
          </p>
        </Form>
      )}
    </Formik>
  );
}
