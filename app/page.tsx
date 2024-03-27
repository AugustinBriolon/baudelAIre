"use client"
import { useState } from "react"
import { streamOutput } from "./lib/mistral/get-output"
import { TextAnimation } from "@/components/TextAnimation"

export default function Home() {
  const [output, setOutput] = useState("")

  const handleClick = async (input: FormData) => {
    const question = input.get("question")
    const response = await streamOutput(question?.toString() || "")
    if (response) {
      setOutput(response)
    }
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center py-32 bg-white">
      <div className="w-full max-w-xl flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <h1 className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent  drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]">
            baudel<span className="text-blue-500">AI</span>re
          </h1>
          <p className="text-center text-gray-500 [text-wrap:balance] md:text-xl">Génération de poème grâçe à baudelAIre</p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <form action={handleClick} className="w-full">
            <label className="sr-only">Your message</label>
            <div className="w-full flex items-center gap-4 rounded-lg">
              <input type="text" className="w-full block rounded-2xl p-2.5 border border-gray-200 bg-white text-black focus:ring-blue-500 focus:border-blue-50" placeholder="Je veux un poème qui parle d'amour"></input>
              <button type="submit" className="inline-flex justify-center text-blue-500 rounded-full cursor-pointer hover:bg-blue-10">
                <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                  <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                </svg>
                <span className="sr-only">Envoyer</span>
              </button>
            </div>
          </form>


          {output ?
            <div className="relative mx-auto aspect-square w-full max-w-xl">
              <div className='w-full h-fit min-h-96 p-4 resize-none rounded-2xl border border-gray-200 bg-white text-black'>
                {output}
              </div>
            </div>
            :
            <TextAnimation />
          }
        </div>

      </div>
    </main>
  )
}