"use client"
import { useState } from "react"
import { streamOutput } from "./lib/mistral/get-output"
import { Textarea } from "@/components/Textarea"

export default function Home() {
	const [output, setOutput] = useState("")

	// const displayOutputByLetter = (response: string) => {
	// 	let i = 0
	// 	const interval = setInterval(() => {
	// 		if (i < response.length) {
	// 			setOutput((prev) => {
	// 				if (response.charAt(i) === "\n") {
	// 					return prev + "<br/>"
	// 				}
	// 				return prev + response.charAt(i)
	// 			})
	// 			i++
	// 		} else {
	// 			clearInterval(interval)
	// 		}
	// 	}, 50)
	// }

	const handleClick = async (input: FormData) => {
		const question = input.get("question")
		const response = await streamOutput(question?.toString() || "")
		if (response) {
			setOutput(response)
			// displayOutputByLetter(response)
		}
  }

		return (
			<main className="flex min-h-screen w-full flex-col items-center justify-center py-32 bg-white">
				<div className="w-full max-w-xl">
					<h1 className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent  drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]">
						baudel<span className="text-blue-500">AI</span>re
					</h1>
					<p className="mt-6 text-center text-gray-500 [text-wrap:balance] md:text-xl">Génération de poème grâçe à baudelAIre</p>

					<div>
						<form action={handleClick}>
							<input type="text" name="question" placeholder="Type what you want" className="text-black" />
							<button className="bg-black">Get response</button>
							<p className="text-b" dangerouslySetInnerHTML={{ __html: output }} />{" "}
						</form>
					</div>
					<Textarea output={output} />
				</div>
			</main>
		)
	}


// return (
//
// )
