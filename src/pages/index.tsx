import Link from 'next/link'
import React, { useCallback, useEffect, useState, VFC } from 'react'
import { useTimer } from 'hooks/useTimer'

const Home: VFC = () => {
  const [text, setText] = useState<string>('')
  const [text2, setText2] = useState<string>('')
  const [index, setIndex] = useState<number>(0)
  const [index2, setIndex2] = useState<number>(0)
  const { timer, setTimer, count, words, words2, addTodo, addTodo2 } =
    useTimer()

  const changeText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!timer) setTimer(true)
      setText(e.target.value)
    },
    [timer, setTimer]
  )

  const ChangeText2 = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!timer) setTimer(true)
      setText2(e.target.value)
    },
    [timer, setTimer]
  )

  useEffect(() => {
    if (words[index] && text === words[index].value) {
      setText('')
      // 相手から送られた単語出ないなら、相手に送る
      if (words[index].enemy == false) {
        addTodo2(words[index].value, true)
      }
      words[index] = words[index + 1]
      setIndex(index + 1)
    }

    if (words2[index2] && text2 === words2[index2].value) {
      setText2('')
      if (words2[index2].enemy == false) {
        addTodo(words2[index2].value, true)
      }
      words2[index2] = words2[index2 + 1]
      setIndex2(index2 + 1)
    }
  }, [text, text2])

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
                    disabled={count > 59}
                  />
                </div>
              </div>
              <div className='font-serif text-[50px] text-center'>
                <div>{index}</div>
                <div>{count > 59 && (index > index2 ? 'Win' : 'Lose')}</div>
              </div>
            </div>

            <div>
              <div className='p-4 mx-auto mt-10 w-[300px] text-lg text-center rounded-md border-2 border-black shadow-xl'>
                <ul className='flex flex-col-reverse h-[250px]'>
                  <li className='text-2xl'>
                    {words2[index2 + 1] && words2[index2 + 1].value}
                  </li>
                  {words2.map((word, i) => (
                    <li key={i}>
                      {index2 + 1 < i && i < index2 + 9 && word.value}
                    </li>
                  ))}
                </ul>

                {/* 入力する単語 */}
                <div className='text-center'>
                  <div className='h-[40px] text-3xl'>
                    {words2[index2] &&
                      words2[index2].value.split('').map((v, i) => (
                        <span
                          key={i}
                          className={`${
                            text2.length > i &&
                            words2[index2].value.split('')[i] !=
                              text2.split('')[i] &&
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
                    value={text2}
                    onChange={ChangeText2}
                    disabled={count > 59}
                  />
                </div>
              </div>
              <div className='font-serif text-[50px] text-center'>
                <div>{index2}</div>
                <div>{count > 59 && (index2 > index ? 'Win' : 'Lose')}</div>
              </div>
            </div>
          </div>
        </body>
      </main>
    </div>
  )
}

export default Home
