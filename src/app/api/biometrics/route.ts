import { formatDate, randomFloat, randomInt } from "@/lib/helper";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const daysParam = searchParams.get("days");
  const id = searchParams.get("id");

  let days = 14;
  if (daysParam && ["7", "14", "30"].includes(daysParam)) {
    days = parseInt(daysParam);
  }

  const dailyData = generatePastBiometrics(days);

  const avgHeartRate = dailyData.heartRate.reduce((sum, h) => sum + h.value, 0) / dailyData.heartRate.length;
  const totalSteps = dailyData.steps.reduce((sum, s) => sum + s.value, 0);
  const avgSleep = dailyData.sleep.reduce((sum, s) => sum + s.value, 0) / dailyData.sleep.length;

  const mockData = {
    id,
    daily: dailyData,
    stats: {
      avgHeartRate: parseFloat(avgHeartRate.toFixed(1)),
      totalSteps,
      avgSleep: parseFloat(avgSleep.toFixed(1)),
    },
  };

  return NextResponse.json(mockData);
}

function generatePastBiometrics(days: number) {
  const heartRate: { date: string; value: number }[] = [];
  const steps: { date: string; value: number }[] = [];
  const sleep: { date: string; value: number }[] = [];

  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const formattedDate = formatDate(date);

    heartRate.push({ date: formattedDate, value: randomInt(60, 100) });
    steps.push({ date: formattedDate, value: randomInt(4000, 15000) });
    sleep.push({ date: formattedDate, value: randomFloat(5, 9) });
  }

  return { heartRate, steps, sleep };
}
