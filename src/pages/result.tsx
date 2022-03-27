import { useAtom } from 'jotai'
import Link from 'next/link'
import { VFC } from 'react'
import {
  enemyIndextAtom,
  enemyTextAtom,
  enemyWordsArrayAtom,
  enemyWordsAtom,
  indextAtom,
  textAtom,
  wordsArrayAtom,
  wordsAtom,
} from 'libs/Atom'
const Result: VFC = () => {
  // const [loading, setLoading] = useState<boolean>(true)
  // const [index, setIndex] = useState<string>('')
  // const [enemyIndex, setEnemyIndex] = useState<string>('')
  // useEffect(() => {
  //   // const index = sessionStorage.getItem('index')
  //   // const enemyIndex = sessionStorage.getItem('enemyIndex')
  //   // setIndex(sessionStorage.getItem('index'))
  //   if (index && enemyIndex) setLoading(false)
  //   console.log(index)
  //   console.log(enemyIndex)
  // }, [])

  // // const [index, setIndex] = useState(sessionStorage.getItem('index'))
  // // const [enemyIndex, setEnemyIndex] = useState(
  // //   sessionStorage.getItem('enemyIndex')
  // )

  const [text] = useAtom(textAtom)
  const [enemyText] = useAtom(enemyTextAtom)
  const [index] = useAtom(indextAtom)
  const [enemyIndex] = useAtom(enemyIndextAtom)
  const [words] = useAtom(wordsAtom)
  const [enemyWords] = useAtom(enemyWordsAtom)

  const [wordsArray] = useAtom(wordsArrayAtom)
  const [enemyWordsArray] = useAtom(enemyWordsArrayAtom)
  return (
    <div className='mx-auto mt-4 w-[90%] max-w-[800px] text-xl'>
      <Link href='/'>
        <a>typing</a>
      </Link>
      <div className='mt-10'>
        <div className='flex gap-36'>
          <div>{'myIndex: ' + index + text}</div>
          <div>{'enemyIndex: ' + enemyIndex + enemyText}</div>
        </div>
        <div className='mt-10'>
          {/* <ul>
            {words.map((v, i) => (
              <li key={i}>{v.value}</li>
            ))}
          </ul>
          <ul>
            {enemyWords.map((v, i) => (
              <li key={i}>{v.value}</li>
            ))}
          </ul> */}
          {words && enemyWords && (
            <>
              {/* <div>{words[0].value}</div>
              <div>{enemyWords[0].value}</div> */}
              <div className='flex gap-4'>
                {/* <ul>
                  {words.map((v, i) => (
                    <li key={i}>{v.value}</li>
                  ))}
                </ul>
                <ul>
                  {enemyWords.map((v, i) => (
                    <li key={i}>{v.value}</li>
                  ))}
                </ul> */}

                <ul>
                  <li className='mb-2'>全ての単語</li>
                  {wordsArray.map((v, i) => (
                    <li key={i}>{v}</li>
                  ))}
                </ul>

                <ul>
                  <li className='mb-2'>打った単語</li>
                  {wordsArray.map((v, i) => (
                    <li key={i}>{i < index && v}</li>
                  ))}
                </ul>
                <ul>
                  <li className='mb-2'>敵の全ての単語</li>
                  {enemyWordsArray.map((v, i) => (
                    <li key={i}>{v}</li>
                  ))}
                </ul>

                <ul>
                  <li className='mb-2'>敵の打った単語</li>
                  {enemyWordsArray.map((v, i) => (
                    <li key={i}>{i < enemyIndex && v}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Result
