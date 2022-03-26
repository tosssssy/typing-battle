import React, { useState, VFC } from 'react'
import { wordList } from 'dev/wordList'
import { useTimer } from 'hooks/useTimer'

const Home: VFC = () => {
  const [text, setText] = useState<string>('')
  const [index, setIndex] = useState<number>(0)
  const { setTimer, count } = useTimer(60)

  const checkWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
    setTimer(true)
    if (wordList[index] == text) {
      wordList[index] = wordList[index + 1]
      setIndex(index + 1)
      setText('')
    }
  }

  return (
    <div className='mx-auto w-[90%]'>
      <main>
        <body>
          <section className='p-4 mx-auto mt-10 w-[300px] text-center rounded-md border-2 border-black shadow-xl'>
            <ul className='flex flex-col-reverse'>
              {wordList.map((word, i) => (
                <li key={i}>
                  {index < i && i < index + 9 && <li key={i}>{word}</li>}
                </li>
              ))}
            </ul>

            <div className='mt-10 text-center'>
              <div className={`text-xl`}>
                {wordList[index].split('').map((v, i) => (
                  <span
                    key={i}
                    className={`${
                      text.length > i &&
                      wordList[index].split('')[i] != text.split('')[i] &&
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
          <div>
            <div>{String(count)}</div>
          </div>
        </body>
      </main>
    </div>
  )
}

export default Home
