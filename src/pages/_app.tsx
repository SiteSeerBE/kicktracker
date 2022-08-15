import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { UserContext } from 'utils/context'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContext.Provider value={{ user: 'test' }}>
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  )
}

export default MyApp
