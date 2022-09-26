import { doc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import TinderCard from 'react-tinder-card'
import GameTile from 'components/GameTile'
import Header from 'components/Header'
import { gamesCol } from 'utils/firebase'
import { getGamesForRating } from 'utils/queries'

type Direction = 'left' | 'right' | 'up' | 'down'

export async function getStaticProps() {
  return {
    props: {
      protected: true
    }
  }
}

export default function Tinder() {
  const [games, setGames] = useState<Game[]>([])

  const onCardLeftScreen = (gameId: string, direction: Direction) => {
    console.log(gameId + ' left the screen ' + direction)
    const gameRef = doc(gamesCol, gameId)
    switch (direction) {
      case 'left':
        updateDoc(gameRef, { tags: ['bg'] })
        break
      case 'right':
        updateDoc(gameRef, { tags: ['bg', 'good'] })
        break
      case 'up':
        updateDoc(gameRef, { tags: ['rpg'] })
        break
      case 'down':
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
      <Header title="Tinder" />
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
