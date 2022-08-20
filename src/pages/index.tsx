import { Button } from '@material-tailwind/react'
import { initializeApp } from 'firebase/app'
import {
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  startAfter,
  where
} from 'firebase/firestore'
import Head from 'next/head'

import { useState } from 'react'
import Boxart from 'components/Boxart'
import GamesList from 'components/GamesList'
import Loader from 'components/Loader'
import { firestore, gamesCol } from 'utils/firebase'

function postToJSON(doc: QueryDocumentSnapshot<Game>) {
  const data = doc.data()
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    dateAdded: data?.dateAdded.toMillis() || 0
  }
}

const LIMIT = 5

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

  const getMoreGames = async () => {
    setLoading(true)
    const cursor = games[games.length - 1].dates.start
    const q = query(
      gamesCol,
      orderBy('dates.start', 'desc'),
      startAfter(cursor),
      limit(LIMIT)
    )
    const localQuerySnapshot = await getDocs(q)
    const newGames = localQuerySnapshot.docs.map((doc) => doc.data())
    setGames((prevGames) => prevGames.concat(newGames))
    setLoading(false)
    if (newGames.length < LIMIT) {
      setGamesEnd(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-orange-600 to-orange-800 pb-10">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <GamesList games={games} />
        {!loading && !gamesEnd && (
          <Button onClick={getMoreGames}>Load more</Button>
        )}

        <Loader show={loading} />

        {gamesEnd && 'You have reached the end!'}
      </main>
    </div>
  )
}
