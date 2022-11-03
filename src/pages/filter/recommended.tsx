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
import { NextApiResponse } from 'next'
import { useEffect, useState } from 'react'
import GamesList from 'components/GamesList'
import Header from 'components/Header'
import Loader from 'components/Loader'
import { gamesCol } from 'utils/firebase'
import useElementOnScreen from 'utils/useElementOnScreen'

function postToJSON(doc: QueryDocumentSnapshot<Game>) {
  const data = doc.data()
  return {
    ...data,
    dateAdded: data?.dateAdded.toMillis() || 0
  }
}

const LIMIT = 12

type Props = {
  res: NextApiResponse
}

export async function getServerSideProps({ res }: Props) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=900, stale-while-revalidate=900'
  )
  const q = query(
    gamesCol,
    where('live', '==', true),
    where('tags', 'array-contains', 'good'),
    orderBy('dates.start', 'desc'),
    limit(LIMIT)
  )
  const remoteQuerySnapshot = await getDocs(q)
  const games = remoteQuerySnapshot.docs.map(postToJSON)

  return {
    props: { games }
  }
}

export default function Recommended(props: GamePageProps) {
  const [games, setGames] = useState<Game[]>(props.games)
  const [loading, setLoading] = useState<boolean>(false)
  const [gamesEnd, setGamesEnd] = useState<boolean>(false)

  const getMoreGames = async () => {
    setLoading(true)
    const cursor = games[games.length - 1].dates.start
    const q = query(
      gamesCol,
      where('live', '==', true),
      where('tags', 'array-contains', 'good'),
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

  if (games.length === 0) {
    return (
      <div className="flex flex-wrap justify-center gap-5 pt-5 pb-24">
        <Alert className="w-96 bg-secondary text-center">
          No active recommended projects found.
        </Alert>
      </div>
    )
  }

  return (
    <>
      <Header title="Recommended games" />
      <div className="flex flex-wrap justify-center gap-5 pt-5 pb-24">
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
