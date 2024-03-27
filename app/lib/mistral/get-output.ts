"use server"

import MistralClient from "@mistralai/mistralai"

export const streamOutput = async (input: string) => {
	const apiKey = process.env.MISTRAL_API_KEY
	const model = "open-mixtral-8x7b"
	const client = new MistralClient(apiKey)

	const systemInput = {
		role: "system",
    content: "Vous êtes un grand poète français. Répondez uniquement par un poème suivi du nom de l'auteur que tu appelera 'BaudelAIre'. Répondre en français, sauf indication contraire. Ne fournissez rien d'autre que le poème et l'auteur.",

	}

	const userInput = { role: "user", content: input || "Nothing" }
	const chatResponse: any = await client.chat({
		model: model,
		messages: [systemInput, userInput],
	})


	return chatResponse.choices[0].message.content
}

// // Use 'server' environment
// "use server";

// import MistralClient from "@mistralai/mistralai";

// export const streamOutput = async (input: string) => {
//   const apiKey = process.env.MISTRAL_API_KEY;
//   const model = "open-mixtral-8x7b";
//   const client = new MistralClient(apiKey);

//   const userInput = { role: "user", content: input || "" };
//   const chatResponse = client.chatStream({
//     model: model,
//     messages: [userInput],
//   });

//   // Since we cannot directly stream from server to client in Next.js,
//   // we collect all chunks into a single response.
//   let fullResponse = '';
//   for await (const chunk of chatResponse) {
//     if (chunk.choices[0].delta.content !== undefined) {
//       fullResponse += chunk.choices[0].delta.content;

//     }
//   }

//   return fullResponse;
// };
