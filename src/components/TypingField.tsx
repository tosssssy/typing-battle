import clsx from 'clsx'
import { useCallback, useState, VFC } from 'react'
import { Word } from 'types/word'

type Props = {
  className?: string
  words: Word[]
  disabled?: boolean
  onCorrect: () => void
}

export const TypingField: VFC<Props> = ({
  className,
  words,
  disabled = false,
  onCorrect,
}) => {
  const [text, setText] = useState('')

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (words[0].value == e.target.value) {
        onCorrect()
        setText('')
      }
      setText(e.target.value)
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
          <li key={i}>{i > 0 && word.value}</li>
        ))}
      </ul>

      {/* 入力する単語 */}
      <div className='text-center'>
        <div className='h-[40px] text-3xl'>
          {words[0]?.value &&
            words[0].value.split('').map((v, i) => (
              <span
                key={i}
                className={clsx(
                  text.length > i &&
                    words[0].value?.split('')[i] !== text.split('')[i] &&
                    'text-red-500'
                )}
              >
                {v}
              </span>
            ))}
        </div>

        <input
          type='text'
          className='my-2 text-xl border-2 border-black'
          autoFocus
          value={text}
          onChange={onChange}
          disabled={disabled}
        />
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
