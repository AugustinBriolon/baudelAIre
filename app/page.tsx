"use client"
import { useState } from "react"
import { streamOutput } from "./lib/mistral/get-output"

export default function Home() {
	const [output, setOutput] = useState("")

  const displayOutputByLetter = (response: string) => {
		let i = 0
		const interval = setInterval(() => {
			if (i < response.length) {
				setOutput((prev) => {
					
					if (response.charAt(i) === "\n") {
						return prev + "<br/>"
					}
					return prev + response.charAt(i) 
				})
				i++
			} else {
				clearInterval(interval)
			}
		}, 50)
	}


	const handleClick = async (input: FormData) => {
		const question = input.get("question")
		const response = await streamOutput(question?.toString() || "")
		if (response) {
			setOutput("")
			displayOutputByLetter(response)
		}
	}

	return (
		<div>
			<form action={handleClick}>
				<input type="text" name="question" placeholder="Type what you want" className="text-black" />
				<button>Get response</button>
				<p dangerouslySetInnerHTML={{ __html: output }} />{" "}
			</form>
		</div>
	)
}


