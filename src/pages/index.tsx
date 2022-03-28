import { useAtom } from 'jotai'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useMemo, useState, VFC } from 'react'
import { wordList } from 'dev/wordList'
import { useTimer } from 'hooks/useTimer'
import {
  enemyIndextAtom,
  enemyWordsArrayAtom,
  enemyWordsAtom,
  indextAtom,
  wordsArrayAtom,
  wordsAtom,
} from 'libs/Atom'
import { shuffleArray } from 'utils/shuffleArray'

const PLAYING_TIME = 20

interface wordData {
  value: string
  enemy: boolean
}

const Home: VFC = () => {
  const [text, setText] = useState<string>('')
  const [enemyText, setEnemyText] = useState<string>('')
  // const [index, setIndex] = useState<number>(0)
  // const [enemyIndex, setEnemyIndex] = useState<number>(0)
  // const [words, setWords] = useState<wordData[]>()
  // const [enemyWords, setEnemyWords] = useState<wordData[]>()
  const [index, setIndex] = useAtom(indextAtom)
  const [enemyIndex, setEnemyIndex] = useAtom(enemyIndextAtom)
  const [words, setWords] = useAtom(wordsAtom)
  const [enemyWords, setEnemyWords] = useAtom(enemyWordsAtom)

  const [wordsArray, setWordsArray] = useAtom(wordsArrayAtom)
  const [enemyWordsArray, setEnemyWordsArray] = useAtom(enemyWordsArrayAtom)

  useEffect(() => {
    setWords([{ value: 'start', enemy: false }])
    setEnemyWords([{ value: 'start', enemy: false }])
  }, [])

  const { setTimer, count } = useTimer(PLAYING_TIME)
  const [isPlaying, setIsPlaying] = useState(false)

  const displayWords = useMemo(() => shuffleArray(wordList), [])
  const displayEnemyWords = useMemo(() => shuffleArray(wordList), [])

  const router = useRouter()

  const addWord = useCallback(
    (word: string, enemy: boolean) => {
      if (!words) return
      const newWords = [...words, { value: word, enemy: enemy }]
      setWords(newWords)

      const newWordsArray = [...wordsArray, word]
      setWordsArray(newWordsArray)
      console.log('add!!!')
    },
    [words]
  )
  const addEnemyWord = useCallback(
    (word: string, enemy: boolean) => {
      if (!enemyWords) return
      const newWords = [...enemyWords, { value: word, enemy: enemy }]
      setEnemyWords(newWords)

      const newWordsArray = [...enemyWordsArray, word]
      setEnemyWordsArray(newWordsArray)
    },
    [enemyWords]
  )

  // 単語を2秒ごとに追加
  useEffect(() => {
    if (count != 0 && count % 2 == 0) {
      addWord(displayWords[count / 2], false)
      addEnemyWord(displayEnemyWords[count / 2], false)
    }

    if (count >= PLAYING_TIME) {
      const wordsJson = JSON.stringify(words)
      const enemyWordsJson = JSON.stringify(enemyWords)
      // console.log('words: -> ')
      // console.log(words)
      // console.log('JSON: -> ')
      // console.log(wordsJson)

      router.push({
        pathname: `/result`,
        query: {
          index: index,
          enemyIndex: enemyIndex,
          wordsArray: wordsArray,
          enemyWordsArray: enemyWordsArray,
          words: wordsJson,
          enemyWords: enemyWordsJson,
        },
      })
    }
    // addWord, addEnemyWordを入れると無限ループするため
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, displayEnemyWords, displayWords])

  // 入力する度実行
  const changeText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isPlaying) {
        setIsPlaying(true)
        setTimer(true)
      }
      setText(e.target.value)
    },
    [isPlaying, setTimer]
  )

  const changeEnemyText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isPlaying) {
        setIsPlaying(true)
        setTimer(true)
      }
      setEnemyText(e.target.value)
    },
    [isPlaying, setTimer]
  )

  useEffect(() => {
    if (!words || !enemyWords) {
      return
    }

    if (words[index] && text === words[index].value) {
      setText('')
      // 相手から送られた単語出ないなら、相手に送る
      if (words[index].enemy == false) {
        addEnemyWord(words[index].value, true)
      }
      words[index] = words[index + 1]
      setIndex(index + 1)
    }

    if (enemyWords[enemyIndex] && enemyText === enemyWords[enemyIndex].value) {
      setEnemyText('')
      if (enemyWords[enemyIndex].enemy == false) {
        addWord(enemyWords[enemyIndex].value, true)
      }
      enemyWords[enemyIndex] = enemyWords[enemyIndex + 1]
      setEnemyIndex(enemyIndex + 1)
    }
  }, [
    addEnemyWord,
    addWord,
    enemyIndex,
    enemyText,
    enemyWords,
    index,
    text,
    words,
    setIndex,
    setEnemyIndex,
  ])

  return (
    <div className='mx-auto mt-4 w-[90%] max-w-[800px]'>
      <header className='flex justify-between'>
        <div className='font-serif text-3xl'>
          {'Timer : ' + (PLAYING_TIME - count)}
        </div>
        <div className='flex gap-2'>
          <Link href='/chat'>
            <a>chat</a>
          </Link>
          <Link href='/result'>
            <a>result</a>
          </Link>
        </div>
      </header>

      <main>
        <body>
          <div className='flex justify-around'>
            {words && enemyWords && (
              <>
                <div>
                  <div className='p-4 mx-auto mt-10 w-[300px] text-lg text-center rounded-md border-2 border-black shadow-xl'>
                    <ul className='flex flex-col-reverse h-[250px]'>
                      <li className='text-2xl'>
                        {words[index + 1] && words[index + 1].value}
                      </li>
                      {words.map((word, i) => (
                        <li key={i}>
                          {index + 1 < i && i < index + 9 && word.value}
                        </li>
                      ))}
                    </ul>

                    {/* 入力する単語 */}
                    <div className='text-center'>
                      <div className='h-[40px] text-3xl'>
                        {words[index] &&
                          words[index].value.split('').map((v, i) => (
                            <span
                              key={i}
                              className={`${
                                text.length > i &&
                                words[index].value.split('')[i] !=
                                  text.split('')[i] &&
                                'text-red-500'
                              }`}
                            >
                              {v}
                            </span>
                          ))}
                      </div>

                      <input
                        type='text'
                        className='my-2 text-xl border-2 border-black'
                        autoFocus
                        value={text}
                        onChange={changeText}
                        disabled={count > PLAYING_TIME - 1}
                      />
                    </div>
                  </div>
                  <div className='font-serif text-[50px] text-center'>
                    <div>{index}</div>
                    <div>
                      {count > PLAYING_TIME - 1 &&
                        (index > enemyIndex ? 'Win' : 'Lose')}
                    </div>
                  </div>
                </div>

                <div>
                  <div className='p-4 mx-auto mt-10 w-[300px] text-lg text-center rounded-md border-2 border-black shadow-xl'>
                    <ul className='flex flex-col-reverse h-[250px]'>
                      <li className='text-2xl'>
                        {enemyWords[enemyIndex + 1] &&
                          enemyWords[enemyIndex + 1].value}
                      </li>
                      {enemyWords.map((word, i) => (
                        <li key={i}>
                          {enemyIndex + 1 < i &&
                            i < enemyIndex + 9 &&
                            word.value}
                        </li>
                      ))}
                    </ul>

                    {/* 入力する単語 */}
                    <div className='text-center'>
                      <div className='h-[40px] text-3xl'>
                        {enemyWords[enemyIndex] &&
                          enemyWords[enemyIndex].value.split('').map((v, i) => (
                            <span
                              key={i}
                              className={`${
                                enemyText.length > i &&
                                enemyWords[enemyIndex].value.split('')[i] !=
                                  enemyText.split('')[i] &&
                                'text-red-500'
                              }`}
                            >
                              {v}
                            </span>
                          ))}
                      </div>
                      <input
                        type='text'
                        className='my-2 text-xl border-2 border-black'
                        autoFocus
                        value={enemyText}
                        onChange={changeEnemyText}
                        disabled={count > PLAYING_TIME - 1}
                      />
                    </div>
                  </div>
                  <div className='font-serif text-[50px] text-center'>
                    <div>{enemyIndex}</div>
                    <div>
                      {count > PLAYING_TIME - 1 &&
                        (enemyIndex > index ? 'Win' : 'Lose')}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </body>
      </main>
    </div>
  )
}

export default Home
