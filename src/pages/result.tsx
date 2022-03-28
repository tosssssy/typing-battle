import Link from 'next/link'
import { useRouter } from 'next/router'
import { VFC } from 'react'

const Result: VFC = () => {
  // session
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

  // jotai
  // const [index] = useAtom(indextAtom)
  // const [enemyIndex] = useAtom(enemyIndextAtom)
  // const [words] = useAtom(wordsAtom)
  // const [enemyWords] = useAtom(enemyWordsAtom)

  // const [wordsArray] = useAtom(wordsArrayAtom)
  // const [enemyWordsArray] = useAtom(enemyWordsArrayAtom)

  // useRouter
  const router = useRouter()
  // const words = useMemo(() => {
  //   if (!router.query.words) {
  //     return []
  //   }
  //   return JSON.parse(router.query.words![0])
  // }, [])

  // const words = router.query.words || ''

  // console.log(JSON.parse(words))

  // JSON.parse(router.query.words?[0])
  // const object = router.query.words
  console.log(router.query.words)
  const json = router.query.words
  console.log(typeof json)
  // console.log(JSON.parse(router.query.words))

  const myObj = [
    {
      name: 'Skip',
      age: 2,
      favoriteFood: 'Steak',
    },
    {
      name: 'Akio',
      age: 20,
      favoriteFood: 'ticken',
    },
  ]
  const myObjStr = JSON.stringify(myObj)
  console.log('myObj -> ')
  console.log(myObj)
  console.log('JSON -> ')
  console.log(myObjStr)
  console.log(JSON.parse(myObjStr))

  const myObject =
    "[{ name: 'Skip', age: 2, favoriteFood: 'Steak' },{ name: 'Akio', age: 20, favoriteFood: 'ticken' },]"

  const wordsObject = [
    { value: 'start', enemy: true },
    { value: 'undertake', enemy: false },
    { value: 'urge', enemy: true },
    { value: 'trickle', enemy: false },
    { value: 'twist', enemy: false },
    { value: 'tyranny', enemy: false },
    { value: 'twofold', enemy: false },
    { value: 'unbridled', enemy: false },
    { value: 'turn up', enemy: false },
    { value: 'tuition', enemy: false },
  ]

  console.log(JSON.parse(myObject))

  return (
    <div className='mx-auto mt-4 w-[90%] max-w-[800px] text-xl'>
      <Link href='/'>
        <a>typing</a>
      </Link>

      {/* jotai */}
      {/* <div className='mt-10'>
        <div className='mb-4 text-3xl font-bold'>jotai</div>
        <div className='flex gap-36'>
          <div>{'myIndex: ' + index}</div>
          <div>{'enemyIndex: ' + enemyIndex}</div>
        </div>
        <div className='mt-4'>
          {words && enemyWords && (
            <>
              <div className='flex gap-4'>
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
      </div> */}

      {/* useRouterからのデータ */}
      <div className='mt-10'>
        <div className='mb-4 text-3xl font-bold'>useRouter</div>
        <div className='flex gap-36'>
          <div>{'myIndex: ' + router.query.index}</div>
          <div>{'enemyIndex: ' + router.query.enemyIndex}</div>
        </div>
        <div className='mt-4'>
          <>
            <div className='flex gap-4'>
              <ul>
                <li className='mb-2'>全ての単語</li>
                {typeof router.query.wordsArray === 'object' &&
                  router.query.wordsArray.map((v, i) => <li key={i}>{v}</li>)}
                <br></br>
                {/* {JSON.parse(router.query.words).map((v, i) => (
                  <li key={i}>{v.value}</li>
                ))} */}
                {/* {JSON.parse(router.query.words)} */}
                {router.query.words}
              </ul>

              <ul>
                <li className='mb-2'>打った単語</li>
                {typeof router.query.wordsArray === 'object' &&
                  router.query.wordsArray.map((v, i) => (
                    <li key={i}>{i < Number(router.query.index) && v}</li>
                  ))}
              </ul>
              <ul>
                <li className='mb-2'>敵の全ての単語</li>
                {typeof router.query.enemyWordsArray === 'object' &&
                  router.query.enemyWordsArray.map((v, i) => (
                    <li key={i}>{v}</li>
                  ))}
              </ul>

              <ul>
                <li className='mb-2'>敵の打った単語</li>
                {typeof router.query.enemyWordsArray === 'object' &&
                  router.query.enemyWordsArray.map((v, i) => (
                    <li key={i}>{i < Number(router.query.enemyIndex) && v}</li>
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
