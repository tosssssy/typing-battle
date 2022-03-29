import { useAtom } from 'jotai'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { VFC } from 'react'
import {
  enemyIndextAtom,
  enemyWordsAtom,
  indextAtom,
  wordsAtom,
} from 'libs/Atom'

const Result: VFC = () => {
  const router = useRouter()
  const [index] = useAtom(indextAtom)
  const [enemyIndex] = useAtom(enemyIndextAtom)
  const [words] = useAtom(wordsAtom)
  const [enemyWords] = useAtom(enemyWordsAtom)

  return (
    <div className='mx-auto mt-4 w-[90%] max-w-[800px] text-xl'>
      <Link href='/'>
        <a>typing</a>
      </Link>

      <div className='mt-10'>
        <div className='mb-4 text-3xl font-bold'>useRouter</div>
        <div className='flex gap-36'>
          <div>{'myIndex: ' + index}</div>
          <div>{'enemyIndex: ' + enemyIndex}</div>
        </div>
        <div className='mt-4'>
          <>
            <div className='flex gap-4'>
              <ul>
                <li className='mb-2'>全ての単語</li>
                {typeof words === 'object' &&
                  words.map((v, i) => <li key={i}>{v && v.value}</li>)}
                <br />
                <br />
              </ul>

              <ul>
                <li className='mb-2'>打った単語</li>
                {typeof words === 'object' &&
                  words.map((v, i) => (
                    <li key={i}>{i < Number(index) && v && v.value}</li>
                  ))}
              </ul>
              <ul>
                <li className='mb-2'>敵の全ての単語</li>
                {typeof enemyWords === 'object' &&
                  enemyWords.map((v, i) => <li key={i}>{v && v.value}</li>)}
              </ul>

              <ul>
                <li className='mb-2'>敵の打った単語</li>
                {typeof enemyWords === 'object' &&
                  enemyWords.map((v, i) => (
                    <li key={i}>{i < Number(enemyIndex) && v && v.value}</li>
                  ))}
              </ul>
            </div>
          </>
        </div>
      </div>
    </div>
  )
}

export default Result
