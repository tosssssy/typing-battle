import { useCallback, useEffect, useState } from 'react'

interface wordData {
  value: string
  enemy: boolean
}

export const useTimer = (endSecond: number) => {
  const [count, setCount] = useState<number>(0)
  const [timer, setTimer] = useState<boolean>(false)

  const countup = useCallback(() => {
    setCount((count) => count + 1)
  }, [])

  useEffect(() => {
    if (count - 1 > endSecond) {
      setTimer(false)
    }
    if (timer) {
      const timerId = setInterval(countup, 1000)
      return () => clearInterval(timerId)
    }
  }, [timer, count, countup, endSecond])

  return {
    timer,
    setTimer,
    count,
  }
}
