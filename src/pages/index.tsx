import { collection, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import Link from 'next/link'
import React, { useCallback, useMemo, VFC } from 'react'
import { TypingField } from 'components/TypingField'
import { useTimer } from 'hooks/useTimer'
import { useTypingBattle } from 'hooks/useTypingBattle'
import { db } from 'libs/firebase'
import { Word } from 'types/word'

const PLAYING_TIME = 60

const Home: VFC = () => {
  const reference = useMemo(() => collection(db, 'rooms'), [])
  const { count, startTimer } = useTimer(PLAYING_TIME)
  const userName = 'toshiki'
  const { enemyName, displayWords, setDisplayWords, displayEnemyWords } =
    useTypingBattle(reference, userName)

  // const { botStart } = useWordSendingBot(reference, userName, PLAYING_TIME)
  // useEffect(() => botStart(), [botStart])

  const onCorrect = useCallback(
    async (word: Word) => {
      if (!word.id) {
        return
      }
      // 相手のbotから送られてきた場合は送り返す
      if (word.type === 'bot') {
        try {
          await updateDoc(doc(db, 'rooms', word.id), {
            id: word.id,
            userName,
            createdAt: new Date(),
            type: 'obstacle',
          })
        } catch (e) {
          console.error('Error adding document: ', e)
        }
      }
      // 相手から送られてきた場合は消す
      if (word.type === 'obstacle') {
        try {
          await deleteDoc(doc(db, 'rooms', word.id))
        } catch (e) {
          console.error('Error adding document: ', e)
        }
      }
      // mutate処理
      setDisplayWords(displayWords.filter((v) => v.id !== word.id))
    },
    [displayWords, setDisplayWords]
  )

  return (
    <div className='mx-auto mt-4 w-[90%] max-w-[800px]'>
      <header className='flex justify-between'>
        <div className='font-serif text-3xl'>{`Timer : ${count}`}</div>
        <Link href='/chat'>chat</Link>
      </header>

      <main>
        <div className='flex justify-between mt-10'>
          {displayWords && displayEnemyWords && (
            <>
              <TypingField
                words={displayWords}
                disabled={!count}
                onCorrect={onCorrect}
                myTextField={true}
              />
              <TypingField
                words={displayEnemyWords}
                disabled={!count}
                onCorrect={() => {
                  console.log('correct!')
                }}
                myTextField={false}
              />
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default Home
