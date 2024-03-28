"use client"

import { ChangeEvent, useState } from "react"
import { toast } from "sonner"
import { useCompletion } from "ai/react"

import { TextAnimation } from "@/components/TextAnimation"
import Select from "@/components/Select"

import { rimeType, lenght, versType, inspiration, langLevel, temperatureType } from "./utils/optionData"

export default function Home() {
  const [rules, setRules] = useState({
    langLevel: "",
    inspiration: { name: "", characteristics: "" },
    rimeType: { name: "", characteristics: "" },
    lenght: { name: "", characteristics: "" },
    versType: { name: "", characteristics: "" },
    temperatureType: "1"
  })

  const systemeInputLangLevel = rules.langLevel && `Le niveau de langue doit être un niveau de langue ${rules.langLevel}. `

  const systemeInputInspiration = rules.inspiration.name && `Tu dois écrire comme si tu étais ${rules.inspiration.name}. ${rules.inspiration.characteristics}. `

  const systemeInputRimeType = rules.rimeType.name && `Tu dois absolument faire des rimes ${rules.rimeType.name}, ${rules.rimeType.characteristics}. `

  const systemeInputLenght = rules.lenght.name && `Le poème doit être de longueur ${rules.lenght.name}, ${rules.lenght.characteristics}. `

  const systemeInputVersType = rules.versType.name && `Le type de vers est de type ${rules.versType.name}, ${rules.versType.characteristics}. `

  const systemeInputRulesArray = [systemeInputLangLevel, systemeInputInspiration, systemeInputRimeType, systemeInputLenght, systemeInputVersType]



  const { completion, input, handleInputChange, stop, isLoading, handleSubmit, error } = useCompletion({
    api: "/api/generate",
    body: {
      systemInput: `${systemeInputInspiration?.length ? systemeInputInspiration : "Vous êtes un grand poète francais."
        }${systemeInputRimeType}${systemeInputLangLevel}${systemeInputLenght} ${systemeInputVersType} Répondez uniquement par un poème suivi du nom de l'auteur que vous appellerez "BaudelAIre". Ne rajoute rien après le nom de l'auteur, aucune explication ni rien d'autre. Ne numérote pas les vers ni les lignes ni rien. Répondez en français, sauf indication contraire. Ne donnez rien d'autre que le poème et l'auteur. Inventez un titre pour votre poème. Suivez la structure suivante : d'abord le titre du poème, retour à la ligne, puis le poème, retour à la ligne et enfin l'auteur, qui est "BaudelAIre" et non Charles Baudelaire. Vérifie bien que tu as choisi le bon nombre de vers pour ton poème. Ne donne pas d'explications supplémetaire à la fin, donne l'auteur et ensuite arrête de parler.
`,
      rules: systemeInputRulesArray.join(""),
      temperature: rules.temperatureType
    },
  })

  const updateRules = (newRules: any) => {
    setRules((prevRules) => ({
      ...prevRules,
      ...newRules,
    }))
  }

  const resetParams = () => {
    stop()
    handleInputChange({ target: { value: "" } } as ChangeEvent<HTMLInputElement>)
    setRules({
      langLevel: "",
      inspiration: { name: "", characteristics: "" },
      rimeType: { name: "", characteristics: "" },
      lenght: { name: "", characteristics: "" },
      versType: { name: "", characteristics: "" },
      temperatureType: "1"
    })
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between py-16 gap-8 bg-white px-4">
      {error && toast.error(error.message)}
      <div className="w-full max-w-xl flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <h1 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-5xl font-bold text-transparent md:text-7xl">
            baudel<span className="text-blue-500">AI</span>re<span className="text-blue-500">.</span>
          </h1>
          <p className="text-center text-gray-500 [text-wrap:balance] md:text-xl">
            Quand <span className="font-bold">l&apos;IA muse</span> sur les vers, <span className="font-bold">baudelAIre compose</span>.
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
            </div>
            <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4">
              <Select label="Niveau de langue" data={langLevel} setData={updateRules} name="langLevel" />
              <Select label="Inspiration" data={inspiration} setData={updateRules} name="inspiration" />
              <Select label="Longueur" data={lenght} setData={updateRules} name="lenght" />
              <Select label="Diversité des réponses" data={temperatureType} setData={updateRules} name="temperatureType" />
              <Select label="Type de rime" data={rimeType} setData={updateRules} name="rimeType" disabled />
              <Select label="Type de vers" data={versType} setData={updateRules} name="versType" disabled />
            </div>
          </form>

          <TextAnimation output={completion} isLoading={isLoading} stop={stop} />
          {
            completion && (
              <div className="w-full flex items-center justify-end">
                <div className="w-fit h-fit p-2 text-blue-500 hover:text-blue-800 cursor-pointer border border-gray-200 rounded-lg flex items-center gap-4" onClick={resetParams}>
                  <p>Recommencer</p>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 6H3" /><path d="M7 12H3" /><path d="M7 18H3" />
                    <path d="M12 18a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L11 14" />
                    <path d="M11 10v4h4" />
                  </svg>
                </div>
              </div>
            )
          }
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        <p className="text-xs">
          Made by
          <a href="https://august1.dev/" target="_blank" className="text-blue-500 hover:text-blue-700 font-bold"> @Augustin</a>,
          <a href="https://github.com/N0rooo" target="_blank" className="text-blue-500 hover:text-blue-700 font-bold"> @Nicolas </a>
          and
          <a href="" className="text-blue-500 hover:text-blue-700 font-bold"> @Thomas </a>
          with <span>&#128153;</span>
        </p>
      </div>
    </main>
  )
}
