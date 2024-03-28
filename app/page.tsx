"use client"

import { useState } from "react"
import { TextAnimation } from "@/components/TextAnimation"
import Select from "@/components/Select"
import { useCompletion } from "ai/react"

import { langLevel, inspiration, rimeType, lenght, versType } from "./utils/optionData"

export default function Home() {
	const { completion, input, handleInputChange, stop, isLoading, handleSubmit, error } = useCompletion({
		api: "/api/generate",
		body: {
			systemInput:
				"You are a great French poet. Answer only with a poem followed by the author's name, which you will call 'Baudel-Aire'. Answer in French, unless otherwise indicated. Give nothing other than the poem and the author. Invent a title for your poem. Follow this structure: first the title of the poem, return to the line, then the poem, return to the line and finally the author, who is 'BaudelAIre' and not Charles Baudelaire. Absolutely nothing else",
		},
	})

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
    
	const [langLevel, setLangLevel] = useState(["Soutenu", "Courant", "Familier", "Argot", "Vulgaire"])

	const [inspiration, setInspiration] = useState(["Charles Baudelaire", "Victor Hugo", "Arthur Rimbaud", "Paul Verlaine", "Guillaume Apollinaire", "Alfred de Musset", "Paul Eluard", "Louis Aragon", "André Breton", "Robert Desnos", "Jacques Prévert"])

	return (
		<main className="flex min-h-screen w-full flex-col items-center justify-start py-16 bg-white px-4">
			{error && <div className="fixed top-0 left-0 w-full p-4 text-center bg-red-500 text-white">{error.message}</div>}
			<div className="w-full max-w-xl flex flex-col items-center gap-8">
				<div className="flex flex-col items-center gap-2">
					<h1 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-5xl font-bold text-transparent md:text-7xl">
						baudel<span className="text-blue-500">AI</span>re
					</h1>
					<p className="text-center text-gray-500 [text-wrap:balance] md:text-xl">
						Générateur de poème grâçe à l&apos;<span className="font-bold">Intelligence Artificielle</span>.
					</p>
				</div>

				<div className="flex flex-col items-center gap-8 w-full">
					<form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
						<div className="w-full flex items-center gap-4 rounded-lg">
							<input onChange={handleInputChange} value={input} type="text" className="w-full block rounded-lg p-2.5 border border-gray-200 bg-white text-black focus:ring-blue-500 focus:border-blue-50" placeholder="Je veux un poème qui parle d'amour"></input>
							<button type="submit" disabled={isLoading} className="inline-flex justify-center text-blue-500 cursor-pointer hover:bg-blue-10">
								<svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
									<path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
								</svg>
								<span className="sr-only">Envoyer</span>
							</button>
							<button disabled={!isLoading} type="button" onClick={stop} className="inline-block bg-gray-100 hover:bg-gray-300 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-300 hover:border-transparent rounded m-2 disabled:opacity-50">
								Stop
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

					<TextAnimation output={completion} isLoading={isLoading} />
				</div>
			</div>
		</main>
	)

}
