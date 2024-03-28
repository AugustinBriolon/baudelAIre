"use client"

import { useState } from "react"
import { streamOutput } from "./lib/mistral/get-output"
import { TextAnimation } from "@/components/TextAnimation"
import Select from "@/components/Select"

import { langLevel, inspiration, rimeType, lenght, versType } from "./utils/optionData"

export default function Home() {
  const [output, setOutput] = useState("")

  const [rules, setRules] = useState({
    langLevel: "",
    inspiration: "",
    rimeType: "",
    lenght: "",
    versType: ""
  })

  const updateRules = (newRules: any) => {
    setRules(prevRules => ({
      ...prevRules,
      ...newRules
    }))
  }

  console.log(rules);

  const handleClick = async (input: FormData) => {
    const question = input.get("question")
    const response = await streamOutput(question?.toString() || "")
    if (response) {
      setOutput(response)
    }
  }


  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-start py-16 bg-white px-4">
      <div className="w-full max-w-xl flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <h1 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-5xl font-bold text-transparent md:text-7xl">
            baudel<span className="text-blue-500">AI</span>re<span className="text-blue-500">.</span>
          </h1>
          <p className="text-center text-gray-500 [text-wrap:balance] md:text-xl">Générateur de poème grâce à l&apos;<span className="font-bold">Intelligence Artificielle</span>.</p>
        </div>

        <div className="flex flex-col items-center gap-8 w-full">
          <form action={handleClick} className="w-full flex flex-col gap-2">
            <div className="w-full flex items-center gap-4 rounded-lg">
              <input type="text" name="question" className="w-full block rounded-lg p-2.5 border border-gray-200 bg-white text-black focus:ring-blue-500 focus:border-blue-50" placeholder="Je veux un poème qui parle d'amour"></input>
              <button type="submit" className="inline-flex justify-center text-blue-500 cursor-pointer hover:bg-blue-10">
                <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                  <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                </svg>
                <span className="sr-only">Envoyer</span>
              </button>
            </div>
            <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4">
              <Select label="Niveau de langue" data={langLevel} setData={updateRules} name="langLevel" />
              <Select label="Inspiration" data={inspiration} setData={updateRules} name="inspiration" />
              <Select label="Type de rime" data={rimeType} setData={updateRules} name="rimeType" />
              <Select label="Longueur" data={lenght} setData={updateRules} name="lenght" />
              <Select label="Type de vers" data={versType} setData={updateRules} name="versType" />
            </div>
          </form>

          <TextAnimation key={output} output={output} />

        </div>

      </div>
    </main>
  )
}
