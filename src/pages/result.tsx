// import { useAtom } from 'jotai'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { VFC } from 'react'
// import {
//   enemyIndextAtom,
//   enemyWordsAtom,
//   indextAtom,
//   wordsAtom,
// } from 'libs/Atom'

const Result: VFC = () => {
  const router = useRouter()
  // const [index] = useAtom(indextAtom)
  // const [enemyIndex] = useAtom(enemyIndextAtom)
  // const [words] = useAtom(wordsAtom)
  // const [enemyWords] = useAtom(enemyWordsAtom)

  return (
    <div className='mx-auto mt-4 w-[90%] max-w-[800px] text-xl'>
      <Link href='/'>
        <a>typing</a>
      </Link>

      <div className='mt-10'>
        <div className='flex justify-between'>
          <div className='text-center'>
            <div className='text-4xl'>akio</div>
            <div className='text-9xl'>WIN</div>
            {/* <div>{'myIndex: ' + index}</div> */}
            <div className='mt-4 text-4xl'>score: 3200</div>
            <div>
              <span className='ml-10 text-4xl'>240</span>単語
            </div>
            <div className='mt-10 ml-16 text-left'>
              <li>打鍵数： 30000</li>
              <li>ミスタイプ: 0</li>
            </div>

            <div className='mt-10'>
              <div className='mb-2'>打った単語</div>
              <div className='py-4 px-8 rounded-md border-2 border-black'>
                {/* {typeof words === 'object' &&
                  words.map((v, i) => (
                    <li key={i}>{i < Number(index) && v && v.value}</li>
                  ))} */}

                {/* 10件だけ表示 */}
                <ul className='grid grid-cols-2 w-[250px] text-left'>
                  {['apple', 'banana', 'firebase', 'anpan', 'whiteAnpan'].map(
                    (v, i) => (
                      <li key={i}>{v}</li>
                    )
                  )}
                </ul>
                <div className='flex justify-between mt-4 text-white'>
                  <div className='w-[25px] hover:text-blue-400 bg-blue-400 hover:bg-white rounded border-2 border-blue-400 duration-300 cursor-pointer'>
                    ＜
                  </div>
                  <div className='w-[25px] hover:text-blue-400 bg-blue-400 hover:bg-white rounded border-2 border-blue-400 duration-300 cursor-pointer'>
                    ＞
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='text-4xl text-red-600'>vs</div>

          <div className='text-center'>
            <div className='text-4xl'>toshiki</div>
            <div className='text-9xl'>LOSE</div>
            {/* <div>{'enemyIndex: ' + enemyIndex}</div> */}
            <div className='mt-4 text-4xl'>score: 9</div>
            <div>
              <span className='text-4xl'>3</span>単語
            </div>

            <div className='mt-10 ml-16 text-left'>
              <li>打鍵数： 30000</li>
              <li>ミスタイプ: 29991</li>
            </div>

            <div className='mt-10'>
              <div className='mb-2'>打った単語</div>
              <ul className='p-4 rounded-md border-2 border-black'>
                {/* {typeof enemyWords === 'object' &&
                  enemyWords.map((v, i) => (
                    <li key={i}>{i < Number(enemyIndex) && v && v.value}</li>
                  ))} */}
                {['asd', 'asd', 'asd'].map((v, i) => (
                  <li key={i}>{v}</li>
                ))}

                <div className='flex justify-between text-white'>
                  <div className='w-[25px] hover:text-blue-400 bg-blue-400 hover:bg-white rounded border-2 border-blue-400 duration-300 cursor-pointer'>
                    ＜
                  </div>
                  <div className='w-[25px] hover:text-blue-400 bg-blue-400 hover:bg-white rounded border-2 border-blue-400 duration-300 cursor-pointer'>
                    ＞
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </div>

        <div className='mt-4'>
          <>
            <div className='flex gap-4'></div>
          </>
        </div>
      </div>
    </div>
  )
}

export default Result
