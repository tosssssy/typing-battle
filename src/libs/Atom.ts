import { atom } from 'jotai'

interface word {
  value: string
  enemy: boolean
}

export const textAtom = atom<string>('')
export const enemyTextAtom = atom<string>('')
export const indextAtom = atom<number>(0)
export const enemyIndextAtom = atom<number>(0)

// [{}]のデータをindexで定義し、使うことはできるが、別ページでは使えない
// 配列なら使える
export const wordsAtom = atom<word[]>([])
export const enemyWordsAtom = atom<word[]>([])
// export const wordsAtom = atom<word[]>([
//   { value: 'anpan', enemy: false },
// ])
// export const enemyWordsAtom = atom<word[]>([
//   { value: 'anpan', enemy: false },
// ])

export const wordsArrayAtom = atom<string[]>([])
export const enemyWordsArrayAtom = atom<string[]>([])
