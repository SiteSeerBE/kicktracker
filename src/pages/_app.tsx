import 'styles/globals.css'
import { ThemeProvider } from '@material-tailwind/react'
import type { AppProps } from 'next/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Toaster } from 'react-hot-toast'
import { UserContext } from 'utils/context'
import { auth } from 'utils/firebase'

function MyApp({ Component, pageProps }: AppProps) {
  const [user] = useAuthState(auth)

  return (
    <UserContext.Provider value={{ user }}>
      <ThemeProvider>
        <Component {...pageProps} />
        <Toaster />
      </ThemeProvider>
    </UserContext.Provider>
  )
}

export default MyApp
