import { useState } from "react";
import { useFetch } from "@/hooks/useFetcher";
import { useAuth } from "@/context/authContext";
import { Loader } from "@/components/ui/loader";
import { useSearchParams } from "next/navigation";

import { Welcome } from "@/components/welcome";
import { DateRange } from "@/components/dateRange";
import { LineChart } from "@/components/lineChart";
import { BiometricStats } from "@/components/patient/Dashboard/biometricStats";

export function PatientDashboard() {
  const { user } = useAuth();
  const [filterDays, setFilterDays] = useState("7");
  const searchParams = useSearchParams();
  const { data, loading } = useFetch(`/api/biometrics?id=${user?.id}&days=${filterDays}`);

  if (loading) return <Loader />;

  const validStats = ["heartRate", "steps", "sleep"] as const;
  type BiometricKey = (typeof validStats)[number];

  const rawActiveStat = searchParams.get("activeStat");
  const activeStat: BiometricKey = validStats.includes(rawActiveStat as BiometricKey)
    ? (rawActiveStat as BiometricKey)
    : "heartRate";

  const stats = [
    { id: "heartRate", label: "Heart", value: data.stats.avgHeartRate, unit: "bmp" },
    { id: "steps", label: "Steps", value: data.stats.totalSteps, unit: "steps" },
    { id: "sleep", label: "Sleep", value: data.stats.avgSleep, unit: "hours" },
  ];

  const biometric: Record<BiometricKey, string> = {
    heartRate: "Heart Rate (bmp)",
    steps: "Steps",
    sleep: "Sleep (hours)",
  };

  const handleDateRange = (days: string) => {
    setFilterDays(days);
  };
  return (
    <div>
      <Welcome />
      <BiometricStats biometrics={stats} />
      <div className="flex items-center justify-between mt-6 mb-4">
        <h3 className="text-lg text-slate-500 font-bold">Date Filter: </h3>
        <DateRange onClick={handleDateRange} currentDay={filterDays} />
      </div>
      <LineChart chartName={biometric[activeStat]} data={data.daily[activeStat]} />
    </div>
  );
}
