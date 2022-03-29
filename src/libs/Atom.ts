import { atom } from 'jotai'

interface word {
  value: string
  enemy: boolean
}

export const textAtom = atom<string>('')
export const enemyTextAtom = atom<string>('')
export const indextAtom = atom<number>(0)
export const enemyIndextAtom = atom<number>(0)
export const wordsAtom = atom<word[]>([])
export const enemyWordsAtom = atom<word[]>([])
