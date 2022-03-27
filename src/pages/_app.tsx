import '../styles/globals.css'
import type { AppProps } from 'next/app'
// const Provider: React.FC<{
//   initialValues?: Iterable<readonly [AnyAtom, unknown]>
//   scope?: Scope
// }>
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
