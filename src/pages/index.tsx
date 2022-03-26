import Link from 'next/link'
import React, { useCallback, useEffect, useState, VFC } from 'react'
import { useTimer } from 'hooks/useTimer'

const Home: VFC = () => {
  const [text, setText] = useState<string>('')
  const [index, setIndex] = useState<number>(0)
  const { timer, setTimer, count, words } = useTimer()

  const checkWord = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!timer) setTimer(true)
      setText(e.target.value)
    },
    [timer, setTimer]
  )

  useEffect(() => {
    if (words[index] == text) {
      setText('')
      words[index] = words[index + 1]
      setIndex(index + 1)
    }
  }, [text, index, words])

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
                  <li className='text-2xl'>{words[index + 1]}</li>
                  {words.map((word, i) => (
                    <li key={i}>{index + 1 < i && i < index + 9 && word}</li>
                  ))}
                </ul>

                {/* 入力する単語 */}
                <div className='text-center'>
                  <div className='h-[40px] text-3xl'>
                    {words[index] &&
                      words[index].split('').map((v, i) => (
                        <span
                          key={i}
                          className={`${
                            text.length > i &&
                            words[index].split('')[i] != text.split('')[i] &&
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
                    onChange={checkWord}
                    disabled={count > 59}
                  />
                </div>
              </div>
              <div className='font-serif text-[50px] text-center'>{index}</div>
            </div>

            <div>
              <div className='p-4 mx-auto mt-10 w-[300px] text-lg text-center rounded-md border-2 border-black shadow-xl'>
                <ul className='flex flex-col-reverse h-[250px]'>
                  <li className='text-2xl'>{words[index + 1]}</li>
                  {words.map((word, i) => (
                    <li key={i}>{index + 1 < i && i < index + 9 && word}</li>
                  ))}
                </ul>

                {/* 入力する単語 */}
                <div className='text-center'>
                  <div className='h-[40px] text-3xl'>
                    {words[index] &&
                      words[index].split('').map((v, i) => (
                        <span
                          key={i}
                          className={`${
                            text.length > i &&
                            words[index].split('')[i] != text.split('')[i] &&
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
                    onChange={checkWord}
                    disabled={count > 59}
                  />
                </div>
              </div>
              <div className='font-serif text-[50px] text-center'>{index}</div>
            </div>
          </div>
        </body>
      </main>
    </div>
  )
}

export default Home
