import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Toaster } from 'react-hot-toast'
import { UserContext } from 'utils/context'
import { auth } from 'utils/firebase'

function MyApp({ Component, pageProps }: AppProps) {
  const [user] = useAuthState(auth)

  return (
    <UserContext.Provider value={{ user }}>
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  )
}

export default MyApp
