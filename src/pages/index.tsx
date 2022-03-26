import Link from 'next/link'
import React, { useCallback, useEffect, useMemo, useState, VFC } from 'react'
import { wordList } from 'dev/wordList'
import { useTimer } from 'hooks/useTimer'

const END_SECOND = 60

interface wordData {
  value: string
  enemy: boolean
}

const Home: VFC = () => {
  const [text, setText] = useState<string>('')
  const [enemyText, setEnemyText] = useState<string>('')
  const [index, setIndex] = useState<number>(0)
  const [enemyIndex, setEnemyIndex] = useState<number>(0)
  const [words, setWords] = useState<wordData[]>([
    { value: 'start', enemy: false },
  ])
  const [enemyWords, setEnemyWords] = useState<wordData[]>([
    { value: 'start', enemy: false },
  ])
  const { timer, setTimer, count } = useTimer(END_SECOND)

  // 追加する単語をランダムに
  const shuffleArray = useCallback((array: string[]) => {
    const cloneArray = [...array]

    for (let i = cloneArray.length - 1; i >= 0; i--) {
      let rand = Math.floor(Math.random() * (i + 1))
      let tmpStorage = cloneArray[i]
      cloneArray[i] = cloneArray[rand]
      cloneArray[rand] = tmpStorage
    }

    return cloneArray
  }, [])

  const shuffleWords = useMemo(() => shuffleArray(wordList), [shuffleArray])
  const shuffleEnemyWords = useMemo(
    () => shuffleArray(wordList),
    [shuffleArray]
  )

  const addWord = useCallback(
    (word: string, enemy: boolean): void => {
      const newWords = [...words, { value: word, enemy: enemy }]
      setWords(newWords)
    },
    [words]
  )
  const addEnemyWord = useCallback(
    (word: string, enemy: boolean): void => {
      const newWords = [...enemyWords, { value: word, enemy: enemy }]
      setEnemyWords(newWords)
    },
    [enemyWords]
  )

  // 単語を2秒ごとに追加
  useEffect(() => {
    if (count != 0 && count % 2 == 0) {
      addWord(shuffleWords[count / 2], false)
      addEnemyWord(shuffleEnemyWords[count / 2], false)
    }
  }, [count, shuffleWords, shuffleEnemyWords])

  // 入力する度実行
  const changeText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!timer) setTimer(true)
      setText(e.target.value)
    },
    [timer, setTimer]
  )

  const ChangeEnemyText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!timer) setTimer(true)
      setEnemyText(e.target.value)
    },
    [timer, setTimer]
  )

  useEffect(() => {
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
    text,
    enemyText,
    index,
    enemyIndex,
    words,
    enemyWords,
    addWord,
    addEnemyWord,
  ])

  return (
    <div className='mx-auto mt-4 w-[90%] max-w-[800px]'>
      <header className='flex justify-between'>
        <div className='font-serif text-3xl'>{'Timer : ' + (60 - count)}</div>
        <Link href='chat'>chat</Link>
      </header>

      <main>
        <body>
          <div className='flex justify-around'>
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
                    disabled={count > END_SECOND - 1}
                  />
                </div>
              </div>
              <div className='font-serif text-[50px] text-center'>
                <div>{index}</div>
                <div>
                  {count > END_SECOND - 1 &&
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
                      {enemyIndex + 1 < i && i < enemyIndex + 9 && word.value}
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
                    onChange={ChangeEnemyText}
                    disabled={count > END_SECOND - 1}
                  />
                </div>
              </div>
              <div className='font-serif text-[50px] text-center'>
                <div>{enemyIndex}</div>
                <div>
                  {count > END_SECOND - 1 &&
                    (enemyIndex > index ? 'Win' : 'Lose')}
                </div>
              </div>
            </div>
          </div>
        </body>
      </main>
    </div>
  )
}

export default Home
