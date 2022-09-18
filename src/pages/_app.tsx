import 'styles/globals.css'
import { ThemeProvider } from '@material-tailwind/react'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import Layout from 'components/Layout'
import { UserAuthContextProvider } from 'context/UserAuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserAuthContextProvider>
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Toaster />
      </ThemeProvider>
    </UserAuthContextProvider>
  )
}

export default MyApp
