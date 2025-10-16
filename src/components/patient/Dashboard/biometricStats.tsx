import { BiometricStatsProps } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { BiometricCard } from "@/components/patient/Dashboard/biometricCard";

export function BiometricStats({ biometrics = [] }: BiometricStatsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSetActiveStat = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("activeStat", id); 
    router.push(`${window.location.pathname}?${params.toString()}`);
  };
  const activeStat = searchParams.get("activeStat") ?? "heartRate";
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {biometrics.length > 0 &&
        biometrics.map((biometric, index) => (
          <BiometricCard
            key={index}
            label={biometric.label}
            value={biometric.value}
            unit={biometric.unit}
            id={biometric.id}
            onClick={handleSetActiveStat}
            activeStat={activeStat}
          />
        ))}
    </div>
  );
}
