import { NextResponse } from "next/server";
import { generateInterviewQuestions, analyzeAnswer, generateFollowUpQuestion, getInterviewTips } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const { action, data } = await req.json();

    switch (action) {
      case "generateQuestions":
        const questions = await generateInterviewQuestions(data.category, data.difficulty);
        return NextResponse.json(questions);

      case "analyzeAnswer":
        const analysis = await analyzeAnswer(data.question, data.answer);
        return NextResponse.json(analysis);

      case "generateFollowUp":
        const followUp = await generateFollowUpQuestion(data.question, data.answer);
        return NextResponse.json({ followUp });

      case "getTips":
        const tips = await getInterviewTips(data.category);
        return NextResponse.json(tips);

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 