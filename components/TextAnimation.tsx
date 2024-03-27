import { TypeAnimation } from 'react-type-animation';

import poemsList from '../app/utils/poemsList';

export function TextAnimation() {
  const poems = poemsList
  const poem1 = `${poems[0].title} \n\n ${poems[0].content} \n\n ${poems[0].author}`
  const poem2 = `${poems[1].title} \n\n ${poems[1].content} \n\n ${poems[1].author}`
  const poem3 = `${poems[2].title} \n\n ${poems[2].content} \n\n ${poems[2].author}`

  return (
    <div className="relative mx-auto mt-6 aspect-square w-full max-w-xl">
      <div className='w-full h-fit min-h-96 p-4 resize-none rounded-2xl border border-gray-200 bg-white text-black'>
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
      </div>
    </div>
  )
}