import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export function AccountType() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") ?? "patient";

  const handleRole = (role: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("role", role);
    router.replace(`?role=${role.toString()}`);
  };

  return (
    <>
      <h3 className="text-center text-slate-600 dark:text-slate-300 font-medium mb-4">Select your account type</h3>
      <div className="flex justify-center">
        <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <Button
            variant={role === "patient" ? "outline" : "ghost"}
            onClick={() => handleRole("patient")}
            className={`cursor-pointer 
                        ${role === "patient" ? "dark:border-slate-400 dark:text-slate-200" : "dark:text-slate-300"}`}
          >
            Patient
          </Button>
          <Button
            variant={role === "clinician" ? "outline" : "ghost"}
            onClick={() => handleRole("clinician")}
            className={`cursor-pointer 
                        ${role === "clinician" ? "dark:border-slate-400 dark:text-slate-200" : "dark:text-slate-300"}`}
          >
            Clinician
          </Button>
        </div>
      </div>
    </>
  );
}
