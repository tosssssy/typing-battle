import React, { useEffect, useState, VFC } from 'react'
import { useTimer } from 'hooks/useTimer'
import Link from 'next/link'

const Home: VFC = () => {
  const [text, setText] = useState<string>('')
  const [index, setIndex] = useState<number>(0)
  const { setTimer, count, words } = useTimer()

  const checkWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
    setTimer(true)
    if (words[index] == text) {
      words[index] = words[index + 1]
      setIndex(index + 1)
      setText('')
    }
  }

  return (
    <div className='mx-auto w-[90%]'>
      <header className='flex justify-between'>
        <div className=''>{'Timer ' + (60 - count)}</div>
        <Link href='chat'>chat</Link>
      </header>
      <main>
        <body>
          <section className='p-4 mx-auto mt-10 w-[300px] text-center rounded-md border-2 border-black shadow-xl'>
            <ul className='h-[250px] flex flex-col-reverse'>
              {words.map((word, i) => (
                <li key={i}>
                  {index < i && i < index + 9 && <li key={i}>{word}</li>}
                </li>
              ))}
            </ul>

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
              {/* 60秒、配列が最後尾になったら止める */}
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

          <div className='text-[50px] font-serif text-center'>{index}</div>
        </body>
      </main>
    </div>
  )
}

export default Home
