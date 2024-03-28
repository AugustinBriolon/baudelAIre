import MistralClient from "@mistralai/mistralai";
import dotenv from "dotenv";
dotenv.config();
import { StreamingTextResponse, MistralStream } from "ai";
import { NextRequest } from "next/server";

const model = "mistral-small-latest";
const apiKey = process.env.MISTRAL_API_KEY;
const client = new MistralClient(apiKey);

export async function POST(req: NextRequest) {
  const { systemInput, prompt, rules, temperature } = await req.json();

  if (!prompt || !systemInput) {
    return new Response("Missing userInput or systemInput", { status: 400 });
  }  

  const learnIA = `1. Structure du poème
Vers: Le vers est la ligne de base d'un poème. Sa longueur peut varier considérablement, et il peut suivre un schéma rythmique spécifique ou être libre.
  
  Strophe: Les strophes sont des regroupements de vers, semblables aux paragraphes dans la prose. Elles peuvent avoir un nombre fixe de vers et suivre un motif répétitif, aidant à structurer le poème.
  
  Types de poèmes: Il existe de nombreux types de poèmes, chacun avec sa propre structure. Par exemple, un sonnet est généralement composé de 14 vers avec un schéma de rime spécifique, tandis qu'un haïku est un poème japonais traditionnel de trois lignes avec 5, 7, et 5 syllabes respectivement.
  
  2. Métrique et Rythme
  Syllabes: Les syllabes sont les unités de son qui composent les mots. En poésie, le nombre de syllabes par vers peut être important pour la structure rythmique.
  
  Pieds poétiques: Un pied poétique est une unité de mesure en poésie qui comprend une combinaison spécifique de syllabes accentuées et non accentuées. Les types de pieds incluent l'iambe (une syllabe non accentuée suivie d'une accentuée), le trochée (l'inverse de l'iambe), et d'autres.
  
  Schémas métriques: Le schéma métrique d'un poème décrit le modèle répétitif des pieds à travers les vers. Par exemple, un vers iambique pentamètre a cinq pieds iambes.
  
  3. Rime et Sonorité
  Schémas de rime: Les rimes peuvent suivre différents schémas dans les strophes, comme AABB (rime plate) ou ABAB (rime croisée). Elles contribuent à la musicalité du poème.
  
  Allitération, assonance, consonance: Ces techniques répètent certains sons pour créer des effets sonores. L'allitération répète les consonnes au début des mots, l'assonance répète les sons des voyelles à l'intérieur des mots, et la consonance répète les sons des consonnes à la fin ou au milieu des mots.
  
  4. Langage et Imaginaire
  Images: La poésie utilise souvent des descriptions visuelles, olfactives, tactiles, gustatives, ou auditives pour créer des images vivantes dans l'esprit du lecteur, enrichissant l'expérience émotionnelle et sensorielle du poème.
  
  Figures de style: Les poètes emploient diverses figures de style pour ajouter de la profondeur et du sens à leurs œuvres. La métaphore et la comparaison établissent des relations entre des éléments apparemment non liés, tandis que la personnification attribue des caractéristiques humaines à des objets non humains.
  
  Tonalité et Thème: La tonalité d'un poème reflète l'attitude du poète envers son sujet, pouvant être joyeuse, mélancolique, ironique, etc. Le thème, quant à lui, est l'idée centrale ou le message véhiculé par le poème.
  
  La poésie est un art de précision et d'émotion, où chaque mot, son, et structure est choisi pour son effet potentiel sur le lecteur. Les poètes jonglent avec ces éléments pour exprimer des complexités émotionnelles, capturer des moments fugaces, ou simplement célébrer la beauté de la langue elle-même.`


  const userMsg = {
    role: "user",
    content: learnIA + prompt + "Fais en sorte que mon poeme rime, que ce soit les mêmes sons à la fin des vers ! Ne donne pas d'explications supplémetaire à la fin, donne l'auteur et ensuite arrête de parler."
  };

  const systemMsg = {
    role: "system",
    content: systemInput,
  };

  const chatResponse = client.chatStream({
    model: model,
    messages: [systemMsg, userMsg],
    temperature: temperature,
  });
  const stream = MistralStream(chatResponse);

  return new StreamingTextResponse(stream);
}
