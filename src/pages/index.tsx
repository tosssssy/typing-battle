import Link from 'next/link'
import React, { useEffect, useState, VFC } from 'react'
import { useTimer } from 'hooks/useTimer'

const Home: VFC = () => {
  const [text, setText] = useState<string>('')
  const [index, setIndex] = useState<number>(0)
  const { timer, setTimer, count, words } = useTimer()

  const checkWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!timer) setTimer(true)
    setText(e.target.value)
  }

  useEffect(() => {
    if (words[index] == text) {
      setText('')
      words[index] = words[index + 1]
      setIndex(index + 1)
    }
  }, [text])

  return (
    <div className='mx-auto w-[90%]'>
      <header className='flex justify-between'>
        <div className=''>{'Timer ' + (60 - count)}</div>
        <Link href='chat'>chat</Link>
      </header>
      <main>
        <body>
          <section className='p-4 mx-auto mt-10 w-[300px] text-center rounded-md border-2 border-black shadow-xl'>
            <ul className='flex flex-col-reverse h-[250px]'>
              {words.map((word, i) => (
                <li key={i}>{index < i && i < index + 9 && word}</li>
              ))}
            </ul>

            {/* 入力する単語 */}
            <div className='mt-10 text-center'>
              <div className='h-[40px] text-2xl'>
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
                className='border-2 border-black'
                autoFocus
                value={text}
                onChange={checkWord}
                disabled={count > 59}
              />
            </div>
          </section>

          <div className='font-serif text-[50px] text-center'>{index}</div>
        </body>
      </main>
    </div>
  )
}

export default Home
