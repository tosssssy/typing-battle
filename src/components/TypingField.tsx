import clsx from 'clsx'
import { useCallback, useState, VFC } from 'react'
import { Word } from 'types/word'

type Props = {
  className?: string
  words: Word[]
  disabled?: boolean
  onCorrect: (word: Word) => void
  myTextField: boolean
}

export const TypingField: VFC<Props> = ({
  className,
  words,
  disabled = false,
  onCorrect,
  myTextField,
}) => {
  const [text, setText] = useState('')

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (words[0]?.value && words[0].value == e.target.value) {
        onCorrect(words[0])
        setText('')
      } else {
        setText(e.target.value)
      }
    },
    [onCorrect, words]
  )

  return (
    <div
      className={clsx(
        className,
        'p-4 w-[300px] text-lg text-center rounded-md border-2 border-black shadow-xl'
      )}
    >
      <ul className='flex flex-col-reverse h-[250px]'>
        {words.map((word, i) => (
          <li
            key={i}
            className={`${
              word.userName != 'bot' &&
              'underline underline-offset-2 text-emerald-600 animate-pulse'
            }`}
          >
            {i > 0 && i < 10 && word.value}
          </li>
        ))}
      </ul>

      {/* 入力する単語 */}
      <div className='text-center'>
        {words[0]?.value && (
          <div
            className={`h-[40px] text-3xl ${
              words[0].userName != 'bot' && 'underline underline-offset-2'
            }`}
          >
            {words[0].value.split('').map((word, i) => (
              <span
                key={i}
                className={clsx(
                  text.length > i &&
                    words[0].value?.split('')[i] !== text.split('')[i] &&
                    'text-red-500',
                  words[0].userName != 'bot' &&
                    'text-emerald-600 underline underline-offset-2'
                )}
              >
                {word}
              </span>
            ))}
          </div>
        )}

        {myTextField && (
          <input
            type='text'
            className='my-2 text-xl border-2 border-black'
            autoFocus
            value={text}
            onChange={onChange}
            disabled={disabled}
          />
        )}
      </div>
      {/* <div className='font-serif text-[50px] text-center'>
          <div>{index}</div>
          <div>
        {count > PLAYING_TIME - 1 &&
          (index > enemyIndex ? 'Win' : 'Lose')}
      </div>
        </div> */}
    </div>
  )
}
