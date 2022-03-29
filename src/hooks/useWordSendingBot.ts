import {
  addDoc,
  CollectionReference,
  DocumentData,
  updateDoc,
} from 'firebase/firestore'
import { useCallback, useEffect } from 'react'
import { useTimer } from './useTimer'
import { Word } from 'types/word'
import { getRandomWord } from 'utils/getRandomWord'

//一定間隔に一度自分に単語を送るbot
export const useWordSendingBot = (
  reference: CollectionReference<DocumentData>,
  enemyName: string,
  playingTime: number
) => {
  const { count, startTimer } = useTimer(playingTime)

  const sendRandomWord = useCallback(async () => {
    try {
      const word: Word = {
        userName: enemyName,
        value: getRandomWord(),
        createdAt: new Date(),
        type: 'bot',
      }
      const docRef = await addDoc(reference, word)
      await updateDoc(docRef, { id: docRef.id })
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }, [reference, enemyName])

  useEffect(() => {
    if (count > 0 && count < playingTime && count % 3 === 0) {
      sendRandomWord()
    }
  }, [count, sendRandomWord, playingTime, enemyName])

  return {
    botStart: startTimer,
  }
}
