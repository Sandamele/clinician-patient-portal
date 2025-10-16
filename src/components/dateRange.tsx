import { Calendar } from "lucide-react";
import { Button } from "./ui/button";

export function DateRange({ onClick, currentDay }: { onClick: (days: string) => void; currentDay: string }) {
  return (
    <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 p-2 rounded-2xl items-center transition-colors">
      <Button onClick={() => onClick("7")} variant={currentDay === "7" ? "outline" : "ghost"}>
        7 days
      </Button>
      <Button onClick={() => onClick("14")} variant={currentDay === "14" ? "outline" : "ghost"}>
        14 days
      </Button>
      <Button onClick={() => onClick("30")} variant={currentDay === "30" ? "outline" : "ghost"}>
        30 days
      </Button>
      <Calendar className="text-gray-700 dark:text-gray-300" />
    </div>
  );
}
