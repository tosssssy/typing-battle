import { collection } from 'firebase/firestore'
import Link from 'next/link'
import React, { useMemo, useState, VFC } from 'react'
import { TypingField } from 'components/TypingField'
import { useTimer } from 'hooks/useTimer'
import { useTypingBattle } from 'hooks/useTypingBattle'
import { db } from 'libs/firebase'

const PLAYING_TIME = 60

const Home: VFC = () => {
  const reference = useMemo(() => collection(db, 'rooms'), [])
  const { count, startTimer } = useTimer(PLAYING_TIME)
  const [isPlaying, setIsPlaying] = useState(false)
  const { enemyName, displayWords, displayEnemyWords } = useTypingBattle(
    reference,
    'toshiki'
  )

  // const { botStart } = useWordSendingBot(reference, 'toshiki', PLAYING_TIME)
  // useEffect(() => botStart(), [botStart])
  return (
    <div className='mx-auto mt-4 w-[90%] max-w-[800px]'>
      <header className='flex justify-between'>
        <div className='font-serif text-3xl'>{'Timer : ' + (60 - count)}</div>
        <Link href='/chat'>chat</Link>
      </header>

      <main>
        <div className='flex justify-between mt-10'>
          {displayWords && displayEnemyWords && (
            <>
              <TypingField
                words={displayWords}
                disabled={count === PLAYING_TIME}
                onCorrect={() => {
                  console.log('correct!')
                }}
              />
              <TypingField
                words={displayEnemyWords}
                disabled={count === PLAYING_TIME}
                onCorrect={() => {
                  console.log('correct!')
                }}
              />
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default Home
