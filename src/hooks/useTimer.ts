import { useEffect, useState } from 'react'

export const useTimer = () => {
  const [count, setCount] = useState(0)
  const [timer, setTimer] = useState(false)

  const countup = () => {
    setCount((count) => count + 1)
  }

  useEffect(() => {
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
  }
}
