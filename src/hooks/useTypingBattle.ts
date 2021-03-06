import {
  getDocs,
  query,
  orderBy,
  onSnapshot,
  CollectionReference,
  DocumentData,
  where,
} from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'
import { Word } from 'types/word'

export const useTypingBattle = (
  reference: CollectionReference<DocumentData>,
  userName: string
) => {
  const [enemyName, setEnemyName] = useState('')
  const [allWords, setAllWords] = useState<Word[]>([])
  const [displayWords, setDisplayWords] = useState<Word[]>([])
  const [displayEnemyWords, setDisplayEnemyWords] = useState<Word[]>([])

  // firestoreからのデータ取得（初回）
  const getAllWordsFromFirestore = useCallback(async () => {
    const q = query(reference, orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    // 敵の名前を登録
    if (!enemyName) {
      let isRegistered = false
      querySnapshot.forEach((doc) => {
        if (!isRegistered && doc.data().userName !== userName) {
          isRegistered = true
          setEnemyName(doc.data().userName)
          console.log('enemy name: ', doc.data().userName)
        }
      })
    }

    // 振り分ける処理
    let displayWords: Word[] = []
    let displayEnemyWords: Word[] = []

    querySnapshot.forEach((doc) => {
      const newWord = doc.data() as Word
      // console.log(newWord.userName, '->', newWord.value)
      if (isOwnerDisplayWord(userName, newWord)) {
        displayWords = [...displayWords, newWord]
      }
      if (isOwnerDisplayWord(enemyName, newWord)) {
        displayEnemyWords = [...displayEnemyWords, newWord]
      }
    })

    setAllWords(querySnapshot.docs.map((doc) => doc.data()))
    setDisplayWords(displayWords)
    setDisplayEnemyWords(displayEnemyWords)
  }, [enemyName, reference, userName])
  useEffect(() => {
    getAllWordsFromFirestore()
  }, [getAllWordsFromFirestore])

  // firestoreからのデータ取得（購読）
  useEffect(() => {
    const q = query(
      reference,
      where('createdAt', '>=', new Date()),
      orderBy('createdAt', 'asc')
    )
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const newWord = change.doc.data() as Word
          console.log('received', newWord.value)
          if (
            // なぜか同じものが2回取得されるため
            !allWords.length ||
            newWord.value !== allWords[allWords.length - 1].value ||
            newWord.type !== allWords[allWords.length - 1].type
          ) {
            // 敵の名前を登録
            if (
              !enemyName &&
              newWord.userName &&
              newWord.userName !== userName
            ) {
              setEnemyName(newWord.userName)
              console.log('enemy name: ', newWord.userName)
            }

            // 振り分け処理
            setAllWords([...allWords, newWord])
            if (isOwnerDisplayWord(userName, newWord)) {
              setDisplayWords([...displayWords, newWord])
            }
            if (isOwnerDisplayWord(enemyName, newWord)) {
              setDisplayEnemyWords([...displayEnemyWords, newWord])
            }
          }

          // 敵が単語を消すたびにmutate処理
          if (newWord.userName === enemyName && newWord.type === 'deleted') {
            setDisplayEnemyWords(
              displayEnemyWords.filter((el) => newWord.value !== el.value)
            )
          }
        }
      })
    })
    return unsubscribe
  }, [
    allWords,
    displayEnemyWords,
    displayWords,
    enemyName,
    reference,
    userName,
  ])

  return { enemyName, displayWords, setDisplayWords, displayEnemyWords }
}

// owner側に表示されるコメントかを判定。以下の2通りある。
// 1. 敵から送られてきた単語
// 2.　botから送られてきた単語
const isOwnerDisplayWord = (ownerName: string, word: Word) => {
  if (word.type === 'obstacle' && word.userName !== ownerName) {
    return true
  }
  if (word.type === 'bot' && word.userName !== ownerName) {
    return true
  }
  return false
}
