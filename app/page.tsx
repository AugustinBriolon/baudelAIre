import { Textarea } from "@/components/Textarea";



export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">

      <div className="w-full max-w-xl">
        <h1 className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent  drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]">baudel<span className="text-blue-500">AI</span>re</h1>
        <p className="mt-6 text-center text-gray-500 [text-wrap:balance] md:text-xl">Génération de poème grâçe à baudelAIre</p>

        <Textarea />
      </div>

    </main>
  );
}
