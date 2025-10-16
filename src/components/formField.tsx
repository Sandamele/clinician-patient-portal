import React from "react";
import { FormFieldProps } from "../types";
import { Field, FieldError, FieldLabel } from "./ui/field";
export function FormField({ label, htmlFor, error = "", touched = false, children, className }: FormFieldProps) {
  const showError = error && touched;
  return (
    <Field className={className}>
      <FieldLabel htmlFor={htmlFor}>{label}</FieldLabel>
      {children}
      {showError ? (
        <FieldError role="alert" aria-live="polite">
          {error}
        </FieldError>
      ) : null}
    </Field>
  );
}
