import {
  addDoc,
  CollectionReference,
  DocumentData,
  updateDoc,
} from 'firebase/firestore'
import { useCallback, useEffect } from 'react'
import { useTimer } from './useTimer'
import { Word } from 'types/word'

//一定間隔に一度敵に単語を送るbot
export const useWordSendingBot = (
  reference: CollectionReference<DocumentData>,
  userName: string,
  playingTime: number
) => {
  const { count, startTimer } = useTimer(playingTime)

  const sendRandomWord = useCallback(async () => {
    try {
      const word: Word = {
        userName: userName,
        value: String(count),
        createdAt: new Date(),
        type: 'bot',
      }
      const docRef = await addDoc(reference, word)
      await updateDoc(docRef, { id: docRef.id })
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }, [count, reference, userName])

  useEffect(() => {
    if (count > 0 && count < playingTime && count % 3 === 0) {
      sendRandomWord()
    }
  }, [count, sendRandomWord, playingTime, userName])

  return {
    botStart: startTimer,
  }
}
