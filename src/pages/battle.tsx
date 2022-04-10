import { addDoc, collection } from 'firebase/firestore'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useMemo } from 'react'
import { TypingField } from 'components/TypingField'
import { useTimer } from 'hooks/useTimer'
import { useTypingBattle } from 'hooks/useTypingBattle'
import { useWordSendingBot } from 'hooks/useWordSendingBot'
import { db } from 'libs/firebase'
import { Word } from 'types/word'

const PLAYING_TIME = 20

const BattlePage: NextPage = () => {
  const router = useRouter()
  const userName = (router.query.name as string) || 'empty'
  const room = (router.query.room as string) || 'empty'
  const colRef = useMemo(() => collection(db, room), [room])
  const { count, startTimer } = useTimer(PLAYING_TIME)
  const { enemyName, displayWords, setDisplayWords, displayEnemyWords } =
    useTypingBattle(colRef, userName)
  const { botStart } = useWordSendingBot(colRef, enemyName, PLAYING_TIME)

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
          await addDoc(colRef, {
            id: word.id,
            userName,
            value: word.value,
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
          await addDoc(colRef, {
            id: word.id,
            userName,
            value: word.value,
            createdAt: new Date(),
            type: 'deleted',
          })
        } catch (e) {
          console.error('Error adding document: ', e)
        }
      }
    },
    [setDisplayWords, displayWords, colRef, userName]
  )

  return (
    <div className='mx-auto mt-4 w-[90%] max-w-[800px]'>
      <header className='flex justify-between'>
        <div className='font-serif text-3xl'>{`Timer : ${count}`}</div>
        <div className='flex gap-4'>
          <Link href='/'>
            <a>top</a>
          </Link>
          <Link href={`/chat?name=${userName}&room=${room}`}>
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

export default BattlePage
