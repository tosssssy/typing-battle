import { addDoc, CollectionReference, DocumentData } from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'
import { useTimer } from './useTimer'

//一定間隔に一度敵に単語を送るbot
export const useWordSendingBot = (
  reference: CollectionReference<DocumentData>,
  userName: string,
  time: number
) => {
  const [isStarted, setIsStarted] = useState(false)
  const { setTimer, count } = useTimer(time)

  useEffect(() => {
    if (isStarted) {
      setTimer(true)
    }
  }, [isStarted, setTimer])

  const sendRandomWord = useCallback(async () => {
    try {
      await addDoc(reference, {
        value: String(count),
        userName: `${userName}_bot`,
        createdAt: new Date(),
      })
      console.log('send', count)
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }, [count, reference, userName])

  useEffect(() => {
    if (count < time && count % 3 === 0) {
      sendRandomWord()
    }
  }, [count, sendRandomWord, time, userName])

  return {
    start: () => {
      setIsStarted(true)
    },
  }
}
