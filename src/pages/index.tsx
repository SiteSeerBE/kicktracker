import { Button } from '@material-tailwind/react'
import {
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter
} from 'firebase/firestore'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import GamesList from 'components/GamesList'
import Layout from 'components/Layout'
import Loader from 'components/Loader'
import { gamesCol } from 'utils/firebase'
import useDarkMode from 'utils/useDarkMode'
import useElementOnScreen from 'utils/useElementOnScreen'

function postToJSON(doc: QueryDocumentSnapshot<Game>) {
  const data = doc.data()
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    dateAdded: data?.dateAdded.toMillis() || 0
  }
}

const LIMIT = 12 // maximum games in one call

export async function getServerSideProps() {
  const q = query(gamesCol, orderBy('dates.start', 'desc'), limit(LIMIT))
  const remoteQuerySnapshot = await getDocs(q)
  const games = remoteQuerySnapshot.docs.map(postToJSON)

  return {
    props: { games }
  }
}

type Props = {
  games: Game[]
}

export default function Home(props: Props) {
  const [games, setGames] = useState<Game[]>(props.games)
  const [loading, setLoading] = useState<boolean>(false)
  const [gamesEnd, setGamesEnd] = useState<boolean>(false)
  const { mode, setMode } = useDarkMode()

  const getMoreGames = async () => {
    setLoading(true)
    const cursor = games[games.length - 1].dates.start
    const q = query(
      gamesCol,
      orderBy('dates.start', 'desc'),
      startAfter(cursor),
      limit(LIMIT)
    )
    await getDocs(q).then(async (localQuerySnapshot) => {
      const newGames = localQuerySnapshot.docs.map((doc) => doc.data())
      setGames(games.concat(newGames))
      if (newGames.length < LIMIT) {
        setGamesEnd(true)
      }
      setLoading(false)
    })
  }

  const { containerRef, isVisible } = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  })

  useEffect(() => {
    if (isVisible) getMoreGames()
  })

  return (
    <div className={mode}>
      <div className="flex min-h-screen flex-row justify-start bg-gradient-to-r from-orange-700 via-orange-600 to-orange-400 dark:from-blue-gray-900 dark:via-blue-gray-900 dark:to-blue-gray-900">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
          <GamesList games={games} />
          {!loading && !gamesEnd && (
            <Button onClick={getMoreGames} ref={containerRef}>
              Load more
            </Button>
          )}

          <Loader show={loading} />

          {gamesEnd && 'You have reached the end!'}
        </Layout>
      </div>
    </div>
  )
}
