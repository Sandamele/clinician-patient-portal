
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
  try {
    const simulatedDelay = 600 + Math.floor(Math.random() * 300);
    await delay(simulatedDelay);

    const mockedResponse = {
      message: getRandomReply(),
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(mockedResponse);
  } catch (error) {
    console.error("GET /api/ai error:", error);
    return NextResponse.json(
      { error: "Failed to fetch AI response" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const simulatedDelay = 600 + Math.floor(Math.random() * 300);
    await delay(simulatedDelay);

    const mockedResponse = {
      message: `${getRandomReply()}`,
      timestamp: new Date().toISOString(),
      prompt: body.prompt,
    };

    return NextResponse.json(mockedResponse);
  } catch (error) {
    console.error("POST /api/ai error:", error);
    return NextResponse.json(
      { error: "Failed to process AI request" },
      { status: 500 }
    );
  }
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const mockedReplies = [
  "Based on your symptoms, it might be worth scheduling a check-up.",
  "Have you been tracking your daily vitals consistently?",
  "This seems manageable, but please consult your doctor for confirmation.",
  "Consider adjusting your medication schedule as we discussed.",
  "Your recent test results look within normal ranges.",
  "I recommend maintaining a balanced diet and regular exercise.",
  "Could you provide more details about your current condition?"
];

function getRandomReply() {
  const index = Math.floor(Math.random() * mockedReplies.length);
  return mockedReplies[index];
}
