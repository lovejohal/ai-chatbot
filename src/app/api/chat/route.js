import { NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";


export async function POST(req) {
try {
  const { messages } = await req.json();

  if (!messages) {
    return NextResponse.json({ reply: "No messages provided." }, { status: 400 });
  }

  const chat = new ChatOpenAI({
    modelName: "gpt-5-nano-2025-08-07",
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  const response = await chat.invoke(messages);

  return NextResponse.json({ reply: response.content });
} catch (err) {
  console.error("Chat API error:", err);
  return NextResponse.json({ error: "Server error" }, { status: 500 });
}
}