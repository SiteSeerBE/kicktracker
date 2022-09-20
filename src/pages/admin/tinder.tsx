import {
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where
} from 'firebase/firestore'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import TinderCard from 'react-tinder-card'
import GameTile from 'components/GameTile'
import { gamesCol } from 'utils/firebase'
import { getGamesForRating } from 'utils/queries'

export async function getStaticProps() {
  return {
    props: {
      protected: true
    }
  }
}

export default function Tinder() {
  const [loading, setLoading] = useState<boolean>(false)
  const [games, setGames] = useState<Game[]>([])

  const onCardLeftScreen = (gameId: string, direction: string) => {
    console.log(gameId + ' left the screen ' + direction)
    const gameRef = doc(gamesCol, gameId)
    switch (direction) {
      case 'left':
        updateDoc(gameRef, { tags: ['bg'] })
        break
      case 'right':
        updateDoc(gameRef, { tags: ['bg', 'good'] })
        break
      case 'top':
        updateDoc(gameRef, { tags: ['rpg'] })
        break
      case 'bottom':
        updateDoc(gameRef, { tags: ['other'] })
    }
  }

  useEffect(() => {
    async function fetchData() {
      setGames(await getGamesForRating())
    }
    fetchData()
  }, [])
  return (
    <div className="overflow-hidden">
      <Head>
        <title>Tinder | Kicktracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {games.map((game) => (
        <TinderCard
          className="absolute m-auto"
          key={game.id}
          onCardLeftScreen={(direction) => onCardLeftScreen(game.id, direction)}
        >
          <GameTile game={game} />
        </TinderCard>
      ))}
    </div>
  )
}
