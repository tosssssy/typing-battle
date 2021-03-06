// チャット機能を開発するためのページ

import {
  collection,
  addDoc,
  onSnapshot,
  getDocs,
  query,
  orderBy,
  updateDoc,
} from 'firebase/firestore'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { db } from 'libs/firebase'
import { Word } from 'types/word'

const ChatPage: NextPage = () => {
  const router = useRouter()
  const userName = (router.query.name as string) || 'empty'
  const room = (router.query.room as string) || 'empty'
  const [comments, setComments] = useState<Word[]>([])
  const [formParams, setFormParams] = useState<{
    userName: string
    value: string
  }>()
  const reference = useMemo(() => collection(db, room), [room])

  useEffect(() => {
    setFormParams({
      userName,
      value: '',
    })
  }, [userName])

  const postComments = useCallback(async () => {
    const q = query(reference, orderBy('createdAt', 'asc'))
    const querySnapshot = await getDocs(q)
    setComments(querySnapshot.docs.map((doc) => doc.data()))
  }, [reference])
  useEffect(() => {
    postComments()
  }, [postComments])

  useEffect(() => {
    const q = query(reference, orderBy('createdAt', 'asc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'modified') {
          // なぜか同じものが2回取得されるため
          if (
            change.doc.data().value === comments[comments.length - 1]?.value
          ) {
            return
          }
          setComments([...comments, change.doc.data()])
        }
      })
    })
    return unsubscribe
  }, [comments, reference])

  const onSubmit = useCallback(async () => {
    if (!formParams || !formParams.userName || !formParams.value) {
      return
    }

    const req: Word = {
      value: formParams?.value || '',
      userName: formParams?.userName || '',
      createdAt: new Date(),
      type: 'obstacle',
    }

    try {
      const docRef = await addDoc(reference, req)
      await updateDoc(docRef, { id: docRef.id })
      console.log('Document written with ID: ', docRef.id)
      setFormParams({
        ...formParams,
        value: '',
      })
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }, [formParams, reference])

  //デバッグ用
  useEffect(() => {
    comments?.forEach((comment) => {
      console.log(`${comment.userName} -> "${comment.value}`)
    })
  }, [comments])

  return (
    <>
      <header>
        <Link href={`/battle?name=${userName}&room=${room}`}>typing</Link>
      </header>
      <div className='mx-8 mb-60'>
        {comments &&
          comments.map((field, index) => {
            return (
              <div key={index} className='my-3'>
                <div>{field.userName || 'unknown'}</div>
                <div className='p-2 text-white bg-green-300 rounded-md'>
                  {`value=${field.value}, type=${field.type}` || '　'}
                </div>
              </div>
            )
          })}
      </div>
      {formParams && (
        <div className='fixed bottom-0 p-6 w-screen bg-slate-200'>
          <input
            type='text'
            value={formParams?.userName}
            className='rounded-sm border'
            placeholder='userName'
            onChange={(e) =>
              setFormParams({
                ...formParams,
                userName: e.target.value,
              })
            }
          />
          <br />
          <input
            type='text'
            value={formParams?.value}
            className='rounded-sm border'
            placeholder='value'
            onChange={(e) =>
              setFormParams({
                ...formParams,
                value: e.target.value,
              })
            }
          />
          <button
            onClick={onSubmit}
            className='p-1 text-white bg-blue-600 rounded-md hover:opacity-75'
          >
            送信
          </button>
        </div>
      )}
    </>
  )
}
export default ChatPage
