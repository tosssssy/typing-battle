import { useAtom } from 'jotai'
import Link from 'next/link'
import { VFC } from 'react'
import {
  enemyIndextAtom,
  enemyTextAtom,
  enemyWordsAtom,
  indextAtom,
  textAtom,
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
  return (
    <div className='mx-auto mt-4 w-[90%] max-w-[800px] text-xl'>
      <Link href='/'>
        <a>typing</a>
      </Link>
      <div className='mt-10'>
        <div className='flex gap-4'>
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
                <ul>
                  {words.map((v, i) => (
                    <li key={i}>{v.value}</li>
                  ))}
                </ul>
                <ul>
                  {enemyWords.map((v, i) => (
                    <li key={i}>{v.value}</li>
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
