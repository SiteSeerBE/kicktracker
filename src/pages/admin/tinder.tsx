import Head from 'next/head'

export async function getStaticProps() {
  return {
    props: {
      protected: true
    }
  }
}

export default function Tinder() {
  return (
    <div className="ml-5 h-full">
      <Head>
        <title>Tinder | Kicktracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-full flex-col items-center justify-center gap-3">
        Hello
      </main>
    </div>
  )
}
