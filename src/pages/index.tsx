import { initializeApp } from 'firebase/app'
import Head from 'next/head'

import Boxart from 'components/Boxart'
import Loader from 'components/Loader'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Loader show={true} />
      </main>
    </div>
  )
}
