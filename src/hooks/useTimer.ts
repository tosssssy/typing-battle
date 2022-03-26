import { useCallback, useEffect, useState } from 'react'
import { wordList } from 'dev/wordList'

interface wordData {
  value: string
  enemy: boolean
}

export const useTimer = () => {
  const [count, setCount] = useState<number>(0)
  const [timer, setTimer] = useState<boolean>(false)
  // const [words, setWords] = useState<string[]>(['start'])
  // const [words2, setWords2] = useState<string[]>(['start'])
  const [words, setWords] = useState<wordData[]>([
    { value: 'start', enemy: false },
  ])
  const [words2, setWords2] = useState<string[]>(['start'])

  // 単語をランダムに
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

  const shuffleWords = shuffleArray(wordList)
  const shuffleWords2 = shuffleArray(wordList)

  const countup = useCallback(() => {
    setCount((count) => count + 1)
  }, [])

  const addTodo = useCallback(
    (word: string) => {
      const newWords = [...words, { value: word, enemy: false }]
      setWords(newWords)
    },
    [words]
  )
  const addTodo2 = useCallback(
    (word: string) => {
      const newWords = [...words2, word]
      setWords2(newWords)
    },
    [words2]
  )

  useEffect(() => {
    // 2秒毎にwordsに単語を追加
    if (count != 0 && count % 2 == 0) {
      addTodo(shuffleWords[count / 2])
      addTodo2(shuffleWords2[count / 2])
    }
    if (count > 59) setTimer(false)
    if (timer) {
      const timerId = setInterval(countup, 1000)
      return () => clearInterval(timerId)
    }
  }, [timer, count])

  return {
    timer,
    setTimer,
    count,
    words,
    words2,
  }
}
