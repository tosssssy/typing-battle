// import { useAtom } from 'jotai'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { VFC } from 'react'
import { Word } from 'types/word'
// import {
//   enemyIndextAtom,
//   enemyWordsAtom,
//   indextAtom,
//   wordsAtom,
// } from 'libs/Atom'

const ResultPage: VFC = () => {
  const router = useRouter()
  // const [userName] = useAtom(userNameAtom)
  // const [enemyUserName] = useAtom(enemyUserNameAtom)
  // const [words] = useAtom(wordsAtom) // wordsは消した単語のオブジェクト
  // const [enemyWords] = useAtom(enemyWordsAtom)
  // const [inputCount] = useAtom(inputCountAtom)
  // const [enemyInputCount] = useAtom(enemyInputCountAtom)
  // const [mistype] = useAtom(mistypeAtom)
  // const [enemyMistype] = useAtom(enemyMistypeAtom)

  // 上のコメントアウトと入れ替え　------------------------------------------
  const userName: string = 'akio'
  const enemyUserName: string = 'toshiki'
  const words: Word[] = [
    // 消した単語
    { value: 'apple', userName: 'akio' },
    { value: 'banana', userName: 'akio' },
    { value: 'firebase', userName: 'akio' },
    { value: 'anpan', userName: 'akio' },
    {
      value:
        'whiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiwhiteAnpanteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiwhiteAnpanteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiwhiteAnpanteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiwhiteAnpanteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiwhiteAnpanteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiwhiteAnpanteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiwhiteAnpanteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiwhiteAnpanteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiwhiteAnpanteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiwhiteAnpanteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiwhiteAnpanteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiwhiteAnpanteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiwhiteAnpanteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiwhiteAnpanteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiwhiteAnpanteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiwhiteAnpanteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiwhiteAnpanteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiwhiteAnpanteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiwhiteAnpanteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiwhiteAnpanteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiwhiteAnpanteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiwhiteAnpanteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiwhiteAnpanteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiwhiteAnpanteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiwhiteAnpanteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiwhiteAnpanteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiwhiteAnpanteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiwhiteAnpanteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiwhiteAnpanteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiwhiteAnpanteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiwhiteAnpanteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiwhiteAnpanteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiwhiteAnpanteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiwhiteAnpanteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiwhiteAnpanteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiteAnpanwhiwhiteAnpanteAnpanwhiteAnpanwhiteAnpan',
      userName: 'akio',
    },
  ]
  const enemyWords: Word[] = [
    { value: 'curry', userName: 'toshiki' },
    { value: 'aws', userName: 'toshiki' },
    { value: 'firebase', userName: 'toshiki' },
    { value: 'firebase', userName: 'toshiki' },
    { value: 'firebase', userName: 'toshiki' },
  ]
  const inputCount: number = 30000
  const enemyInputCount: number = 30000
  const mistype: number = 0
  const enemyMistype: number = 29991
  // ここまで　--------------------------------------------------------

  const index: number = words.length
  const enemyIndex: number = enemyWords.length

  const score = words.reduce(
    (acc, word, i) => (word.value && i < index ? acc + word.value.length : acc),
    0
  )
  const enemyScore = enemyWords.reduce(
    (acc, word, i) =>
      word.value && i < enemyIndex ? acc + word.value.length : acc,
    0
  )

  return (
    <div className='mx-auto mt-4 w-[90%] max-w-[800px] text-xl'>
      <Link href='/'>
        <a>typing</a>
      </Link>

      <div className='mt-10'>
        <div className='flex justify-between'>
          <div className='text-center'>
            <div className='text-4xl'>{userName}</div>
            <div className='text-9xl'>
              {score > enemyScore ? 'WIN' : 'LOSE'}
            </div>
            {/* <div>{'myIndex: ' + index}</div> */}
            <div className='mt-4 text-4xl'>score: {score}</div>
            <div>
              <span className='ml-10 text-4xl'>{index}</span>単語
            </div>
            <div className='mt-10 ml-16 text-left'>
              <li>打鍵数： {inputCount}</li>
              <li>ミスタイプ: {mistype}</li>
            </div>

            <div className='mt-10'>
              <div className='mb-2'>打った単語</div>
              <div className='py-4 px-8 rounded-md border-2 border-black'>
                <ul className='grid grid-cols-2 w-[250px] text-left'>
                  {typeof words === 'object' &&
                    words.map((v, i) => <li key={i}>{v && v.value}</li>)}
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
            <div className='text-4xl'>{enemyUserName}</div>
            <div className='text-9xl'>
              {enemyScore > score ? 'WIN' : 'LOSE'}
            </div>
            {/* <div>{'enemyIndex: ' + enemyIndex}</div> */}
            <div className='mt-4 text-4xl'>score: {enemyScore}</div>
            <div>
              <span className='text-4xl'>{enemyIndex}</span>単語
            </div>

            <div className='mt-10 ml-16 text-left'>
              <li>打鍵数： {enemyInputCount}</li>
              <li>ミスタイプ: {enemyMistype}</li>
            </div>

            <div className='mt-10'>
              <div className='mb-2'>打った単語</div>
              <div className='p-4 rounded-md border-2 border-black'>
                <ul className='grid grid-cols-2 w-[250px] text-left'>
                  {typeof enemyWords === 'object' &&
                    enemyWords.map((v, i) => <li key={i}>{v && v.value}</li>)}
                </ul>

                <div className='flex justify-between text-white'>
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
        </div>
      </div>
    </div>
  )
}

export default ResultPage
