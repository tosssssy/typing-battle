import { useRouter } from 'next/router'
import React, { useCallback, useState, VFC } from 'react'

const TopPage: VFC = () => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')

  const onTransition = useCallback(() => {
    if (!name || !room) {
      return
    }
    router.push({
      pathname: '/battle',
      query: { name, room },
    })
  }, [name, room, router])

  return (
    <main>
      <div className='flex flex-col mt-[40vh] ml-24 w-60'>
        <label>name</label>
        <input
          type='text'
          className='outline'
          onChange={(e) => setName(e.target.value)}
        />
        <label>room</label>
        <input
          type='text'
          className='outline'
          onChange={(e) => setRoom(e.target.value)}
        />
        <button className='p-2 mt-4 outline' onClick={onTransition}>
          start
        </button>
      </div>
    </main>
  )
}

export default TopPage
