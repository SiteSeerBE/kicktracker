import { Alert, Button } from '@material-tailwind/react'
import {
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  where
} from 'firebase/firestore'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import GamesList from 'components/GamesList'
import Loader from 'components/Loader'
import { gamesCol } from 'utils/firebase'
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
  const q = query(
    gamesCol,
    where('live', '==', true),
    where('tags', 'array-contains', 'rpg'),
    orderBy('dates.start', 'desc'),
    limit(LIMIT)
  )
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

  const getMoreGames = async () => {
    setLoading(true)
    const cursor = games[games.length - 1].dates.start
    const q = query(
      gamesCol,
      where('live', '==', true),
      where('tags', 'array-contains', 'rpg'),
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
    <>
      <Head>
        <title>Role-playing games | Kicktracker</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <div className="flex flex-wrap justify-center gap-10 pt-5 pb-20">
        <GamesList games={games} />
        <div className="flex basis-full flex-col">
          {!loading && !gamesEnd && (
            <>
              <Button
                onClick={getMoreGames}
                ref={containerRef}
                className="m-auto w-80"
              >
                Load more games
              </Button>
            </>
          )}
          <Loader show={loading} />
        </div>

        {gamesEnd && (
          <Alert className="w-96 bg-secondary text-center">
            You have reached the end!
          </Alert>
        )}
      </div>
    </>
  )
}
