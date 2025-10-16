import { FormHeadingProps } from "@/types";

export function FormHeading({ title, subtitle }: FormHeadingProps) {
  return (
    <>
      <h1 className="text-center text-3xl font-bold">{title}</h1>
      <h2 className="text-center text-md text-slate-600 font-medium">{subtitle}</h2>
    </>
  );
}
