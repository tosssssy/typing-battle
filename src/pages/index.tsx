import React, { useEffect, useState, VFC } from 'react'
import { wordList } from 'dev/wordList'

const Home: VFC = () => {
  const [text, setText] = useState<string>('')
  const [index, setIndex] = useState<number>(0)
  const [count, setCount] = useState(0)
  const [timer, setTimer] = useState(false)

  const countup = () => {
    setCount((count) => count + 1)
  }

  useEffect(() => {
    if (timer) {
      const timerId = setInterval(countup, 1000)
      return () => clearInterval(timerId)
    }
  }, [timer])

  const checkWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
    if (wordList[index] == text) {
      wordList[index] = wordList[index + 1]
      setIndex(index + 1)
      setText('')
    }
  }

  return (
    <div className='w-[90%] mx-auto'>
      <main>
        <body>
          <section className='p-4 mt-10 w-[300px] mx-auto text-center border-2 border-black rounded-md shadow-xl'>
            <ul className='flex flex-col-reverse'>
              {wordList.map((word, i) => (
                <li>{index < i && i < index + 9 && <li key={i}>{word}</li>}</li>
              ))}
            </ul>

            <div className='mt-10 text-center'>
              <div className={`text-xl`}>
                {wordList[index].split('').map((v, i) => (
                  <span
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
              />
            </div>
          </section>

          <div className='text-[50px] font-serif text-center'>{index}</div>
          <div>
            <h2>My Timer</h2>
            <div>{String(count)}</div>
            <button onClick={() => setTimer(true)}>スタート</button>
            <button onClick={() => setTimer(false)}>ストップ</button>
            <button onClick={() => setCount(0)}>リセット</button>
          </div>
        </body>
      </main>
    </div>
  )
}

export default Home
