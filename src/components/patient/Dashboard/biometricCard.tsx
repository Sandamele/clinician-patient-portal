// components/BiometricCard.tsx
import { Card } from "@/components/ui/card";
import { BiometricCardProps } from "@/types";

export function BiometricCard({ id, label, value, unit, onClick, activeStat }: BiometricCardProps) {
  return (
    <Card
      className={`p-6 bg-white dark:bg-slate-900 rounded-lg shadow-md cursor-pointer ${activeStat === id ? " border border-blue-500 " : ""}`}
      onClick={() => onClick(id)}
    >
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
      <p className="-mt-4 text-3xl font-bold text-black dark:text-white">
        {value} <span className="text-base font-normal text-slate-500 dark:text-slate-400">{unit}</span>
      </p>
    </Card>
  );
}
