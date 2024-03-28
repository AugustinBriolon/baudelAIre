import MistralClient from "@mistralai/mistralai";
import dotenv from "dotenv";
dotenv.config();
import { StreamingTextResponse, MistralStream } from "ai";
import { NextRequest } from "next/server";

const model = "open-mistral-7b";
const apiKey = process.env.MISTRAL_API_KEY;
const client = new MistralClient(apiKey);

export async function POST(req: NextRequest) {
  const { systemInput, prompt } = await req.json();

  if (!prompt || !systemInput) {
    return new Response("Missing userInput or systemInput", { status: 400 });
  }
  
  const userMsg = {
    role: "user",
    content: prompt,
  };

  const systemMsg = {
    role: "system",
    content: systemInput,
  };

  const chatResponse = client.chatStream({
    model: model,
    messages: [systemMsg, userMsg],
  });
  const stream = MistralStream(chatResponse);

  return new StreamingTextResponse(stream);
}
