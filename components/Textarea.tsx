

export function Textarea() {
  return (
    <div className="relative mx-auto mt-6 aspect-square w-full max-w-xl overflow-hidden rounded-2xl border border-gray-200 " >
      <textarea className="w-full h-full p-4 bg-gray-50 resize-none" placeholder="Saisissez votre texte ici..."></textarea>
    </div>
  );
}