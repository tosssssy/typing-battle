import { shuffleArray } from './shuffleArray'
import { wordList } from 'dev/wordList'

// 仮の実装
export const getRandomWord = (amount: number = 1) => {
  return shuffleArray(wordList)[1]
}
