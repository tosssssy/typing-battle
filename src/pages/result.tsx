import Link from 'next/link'
import { VFC } from 'react'
const Result: VFC = () => {
  return (
    <>
      <Link href='index'>
        <a>typing</a>
      </Link>
      <div>Result画面だよ</div>
    </>
  )
}

export default Result
