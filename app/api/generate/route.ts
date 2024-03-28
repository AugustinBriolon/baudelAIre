import MistralClient from "@mistralai/mistralai";
import dotenv from "dotenv";
dotenv.config();
import { StreamingTextResponse, MistralStream } from "ai";
import { NextRequest } from "next/server";

const model = "mistral-small-latest";
const apiKey = process.env.MISTRAL_API_KEY;
const client = new MistralClient(apiKey);

export async function POST(req: NextRequest) {
  const { systemInput, prompt, rules } = await req.json();

  if (!prompt || !systemInput) {
    return new Response("Missing userInput or systemInput", { status: 400 });
  }  
  const userMsg = {
    role: "user",
    content: prompt + ", " + rules,
  };

  const systemMsg = {
    role: "system",
    content: systemInput,
  };

  const chatResponse = client.chatStream({
    model: model,
    messages: [systemMsg, userMsg],
    temperature: 1,
  });
  const stream = MistralStream(chatResponse);
  console.log("Prompt: "+ prompt + ", " + rules, "Systeme: " + systemInput)

  return new StreamingTextResponse(stream);
}
