// チャット機能を開発するためのページ

import { NextPage } from 'next'
import { collection, addDoc, getDocs, DocumentData } from 'firebase/firestore'
import { db } from 'libs/firebase'
import { useCallback, useEffect, useState } from 'react'

const ChatPage: NextPage = () => {
  const [data, setData] = useState<DocumentData>()
  const [formParams, setFormParams] =
    useState<{ value: string; userName: string }>()

  useEffect(() => {
    setFormParams({
      userName: '',
      value: '',
    })
  }, [])

  const getComments = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, 'rooms'))
    setData(querySnapshot.docs.map((doc) => doc.data()))
  }, [])

  useEffect(() => {
    getComments()
  }, [])

  const onSend = useCallback(async () => {
    try {
      const docRef = await addDoc(collection(db, 'rooms'), {
        value: formParams?.value || '',
        userName: formParams?.userName || '',
        createdAt: new Date(),
      })
      console.log('Document written with ID: ', docRef.id)
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }, [])

  return (
    <div>
      <div>{JSON.stringify(data)}</div>
      {formParams && (
        <>
          <input
            type='text'
            value={formParams?.userName}
            className='border'
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
            className='border'
            placeholder='value'
            onChange={(e) =>
              setFormParams({
                ...formParams,
                value: e.target.value,
              })
            }
          />
        </>
      )}
      <button onClick={onSend}>送信ボタン</button>
    </div>
  )
}
export default ChatPage
