import { Form, Formik } from "formik";
import { signupSchema } from "@/schema/signup.schema";
import { FormField } from "@/components/formField";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import auth from "@/lib/auth";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") ?? "patient";
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };
  const handleSubmit = async (
    values: { email: string; password: string; confirmPassword: string },
    { resetForm, setSubmitting }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    try {
      const registerUser = await createUserWithEmailAndPassword(
        auth,
        values.email.toLowerCase().trim(),
        values.password,
      );
      await fetch("/api/auth/role/assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: registerUser.user.email, role, uid: registerUser.user.uid }),
      });
      toast.success("User registered successfully.", { position: "top-center" });
      resetForm();
      router.push("/signin");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong", { position: "top-center" });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Formik initialValues={initialValues} validationSchema={signupSchema} onSubmit={handleSubmit}>
      {({ errors, touched, handleChange, handleBlur, isSubmitting, values }) => (
        <Form>
          <FormField label={"Email"} htmlFor={"email"} error={errors.email} touched={touched.email} className="mt-4">
            <Input
              type="text"
              placeholder="Enter your email"
              name="email"
              id="email"
              value={values.email}
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
                value={values.password}
                autoComplete="new-password"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <InputGroupAddon align="inline-end" className="cursor-pointer">
                {showPassword ? <EyeOff onClick={handleTogglePassword} /> : <Eye onClick={handleTogglePassword} />}
              </InputGroupAddon>
            </InputGroup>
          </FormField>
          <FormField
            label={"Confirm Password"}
            htmlFor={"confirmPassword"}
            error={errors.confirmPassword}
            touched={touched.confirmPassword}
            className="mt-4"
          >
            <InputGroup>
              <InputGroupInput
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Enter your confirm Password"
                name="confirmPassword"
                id="confirmPassword"
                value={values.confirmPassword}
                autoComplete="new-password"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <InputGroupAddon align="inline-end" className="cursor-pointer">
                {showConfirmPassword ? (
                  <EyeOff onClick={handleToggleConfirmPassword} />
                ) : (
                  <Eye onClick={handleToggleConfirmPassword} />
                )}
              </InputGroupAddon>
            </InputGroup>
          </FormField>
          <Button type="submit" className="mt-8 w-full cursor-pointer" disabled={isSubmitting}>
            {!isSubmitting ? "Sign Up" : <Spinner />}
          </Button>
          <p className="text-center mt-2">
            Already have account?{" "}
            <Link href="/signin" className="text-blue-900">
              Sign In
            </Link>{" "}
          </p>
        </Form>
      )}
    </Formik>
  );
}
