import { wordList } from 'dev/wordList'
import { useEffect, useState } from 'react'

export const useTimer = () => {
  const [count, setCount] = useState(0)
  const [timer, setTimer] = useState(false)
  const [words, setWords] = useState<[string]>(['a', 'b'])

  const countup = () => {
    setCount((count) => count + 1)
  }

  const addTodo = (word: string) => {
    const newTodo = [...words, word]
    setWords(newTodo)
  }

  // 2秒毎にwordListから、wordsに単語を追加
  useEffect(() => {
    addTodo(wordList[count])
    if (count > 59) {
      setTimer(false)
    }
    if (timer) {
      const timerId = setInterval(countup, 1000)
      return () => clearInterval(timerId)
    }
  }, [timer, count])

  return {
    setTimer,
    count,
    words,
  }
}
