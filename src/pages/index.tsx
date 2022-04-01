import { addDoc, collection, updateDoc } from 'firebase/firestore'
import Link from 'next/link'
import React, { useCallback, useMemo, VFC } from 'react'
import { TypingField } from 'components/TypingField'
import { useTimer } from 'hooks/useTimer'
import { useTypingBattle } from 'hooks/useTypingBattle'
import { useWordSendingBot } from 'hooks/useWordSendingBot'
import { db } from 'libs/firebase'
import { Word } from 'types/word'

const PLAYING_TIME = 20

const Home: VFC = () => {
  const reference = useMemo(() => collection(db, 'rooms'), [])
  const { count, startTimer } = useTimer(PLAYING_TIME)
  const userName = 'toshiki'
  const { enemyName, displayWords, setDisplayWords, displayEnemyWords } =
    useTypingBattle(reference, userName)

  const { botStart } = useWordSendingBot(reference, enemyName, PLAYING_TIME)

  const onCorrect = useCallback(
    async (word: Word) => {
      if (!word.id) {
        return
      }
      // mutate処理
      setDisplayWords(displayWords.filter((el) => el.id !== word.id))

      // botから送られてきた場合は送り返す
      if (word.type === 'bot') {
        try {
          const docRef = await addDoc(reference, {
            id: word.id,
            userName,
            value: word.value,
            createdAt: new Date(),
            type: 'obstacle',
          })
          await updateDoc(docRef, { id: docRef.id })
        } catch (e) {
          console.error('Error adding document: ', e)
        }
      }
      // 相手から送られてきた場合は消す
      if (word.type === 'obstacle') {
        try {
          const docRef = await addDoc(collection(db, 'rooms'), {
            id: word.id,
            userName,
            value: word.value,
            createdAt: new Date(),
            type: 'deleted',
          })
          await updateDoc(docRef, { id: docRef.id })
        } catch (e) {
          console.error('Error adding document: ', e)
        }
      }
    },
    [displayWords, reference, setDisplayWords]
  )

  return (
    <div className='mx-auto mt-4 w-[90%] max-w-[800px]'>
      <header className='flex justify-between'>
        <div className='font-serif text-3xl'>{`Timer : ${count}`}</div>
        <div className='flex gap-4'>
          <Link href='/chat'>
            <a>chat</a>
          </Link>
          <Link href='/result'>
            <a>result</a>
          </Link>
        </div>
      </header>

      <main>
        <div className='flex justify-between mt-10'>
          {displayWords && displayEnemyWords && (
            <>
              <TypingField
                words={displayWords}
                disabled={!count}
                onCorrect={onCorrect}
              />
              <TypingField
                words={displayEnemyWords}
                onCorrect={() => {
                  console.log('correct!')
                }}
                textInputHidden
              />
            </>
          )}
        </div>
        <button onClick={botStart}>すたーと</button>
      </main>
    </div>
  )
}

export default Home
