import { useEffect, useState } from 'react'

export const useTimer = (endSecond: number) => {
  const [count, setCount] = useState(0)
  const [timer, setTimer] = useState(false)

  useEffect(() => {
    if (count >= endSecond) {
      setTimer(false)
    }
    if (timer) {
      const timerId = setInterval(() => setCount((count) => count + 1), 1000)
      return () => clearInterval(timerId)
    }
  }, [timer, count, endSecond])

  return {
    setTimer,
    count,
  }
}
