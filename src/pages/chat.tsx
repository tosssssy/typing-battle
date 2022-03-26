// チャット機能を開発するためのページ

import {
  collection,
  addDoc,
  DocumentData,
  onSnapshot,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore'
import { NextPage } from 'next'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useWordSendingBot } from 'hooks/useWordSendingBot'
import { db } from 'libs/firebase'
import Link from 'next/link'

const ChatPage: NextPage = () => {
  const [data, setData] = useState<DocumentData[]>()
  const [formParams, setFormParams] =
    useState<{ value: string; userName: string }>()
  const reference = useMemo(() => collection(db, 'rooms'), [])

  useEffect(() => {
    setFormParams({
      userName: '',
      value: '',
    })
  }, [])

  const postComments = useCallback(async () => {
    const querySnapshot = await getDocs(reference)
    setData(querySnapshot.docs.map((doc) => doc.data()))
  }, [reference])
  useEffect(() => {
    postComments()
  }, [postComments])

  useEffect(() => {
    const q = query(reference, orderBy('createdAt', 'asc'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setData(querySnapshot.docs.map((doc) => doc.data()))
    })
    return unsubscribe
  }, [reference])

  const onSubmit = useCallback(async () => {
    if (!formParams || !formParams.userName || !formParams.value) {
      return
    }
    try {
      const docRef = await addDoc(reference, {
        value: formParams?.value || '',
        userName: formParams?.userName || '',
        createdAt: new Date(),
      })
      console.log('Document written with ID: ', docRef.id)
      setFormParams({
        ...formParams,
        value: '',
      })
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }, [formParams, reference])

  const { start } = useWordSendingBot(reference, 'toshiki', 60)

  return (
    <>
      <header>
        <Link href='/'>typing</Link>
      </header>
      <div className='mx-8 mb-60'>
        {data &&
          data.map((field, index) => {
            return (
              <div key={index} className='my-3'>
                <div>{field.userName || 'unknown'}</div>
                <div className='p-2 text-white bg-green-300 rounded-md'>
                  {field.value || '　'}
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
