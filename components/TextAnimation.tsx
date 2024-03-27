import { TypeAnimation } from 'react-type-animation';
import { toast } from 'sonner';

import poemsList from '../app/utils/poemsList';

export function TextAnimation({ output }: { output: string }) {
  const poems = poemsList
  const poem1 = `${poems[0].title} \n\n ${poems[0].content} \n\n ${poems[0].author}`
  const poem2 = `${poems[1].title} \n\n ${poems[1].content} \n\n ${poems[1].author}`
  const poem3 = `${poems[2].title} \n\n ${poems[2].content} \n\n ${poems[2].author}`

  const copyOutput = () => {
    navigator.clipboard.writeText(output)
    toast.success('Your Poem has been copy !');
  }

  return (
    <div className="h-fit mx-auto w-full max-w-xl relative">
      <div className='w-full min-h-96 max-h-fit p-4 resize-none rounded-2xl border border-gray-200 bg-white text-black'>
        {
          output.length === 0 ?
            <TypeAnimation
              sequence={[
                poem1,
                1000,
                poem2,
                1000,
                poem3,
                1000,
              ]}
              speed={99}
              style={{ whiteSpace: 'pre-line' }}
              wrapper="span"
              cursor={false}
              repeat={Infinity}
            />
            :
            <div className='h-full w-textContainer'>
              <TypeAnimation
                sequence={[
                  output
                ]}
                speed={75}
                style={{ whiteSpace: 'pre-line' }}
                wrapper="span"
                cursor={false}
              />
              <div className='absolute top-0 right-0 h-full p-2 flex flex-col items-center justify-between'>
                <div className="h-8 w-8 p-2 text-gray-400 hover:text-gray-600 cursor-pointer border border-gray-200 rounded-lg" onClick={copyOutput}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                </div>
                <span className="text-blue-500 font-display text-2xl font-bold" >AI</span>
              </div>
            </div>
        }
      </div>
    </div>
  )
}