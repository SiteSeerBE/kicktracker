import { Alert, Button, Card, Switch } from '@material-tailwind/react'
import { doc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import GameTile from 'components/GameTile'
import Header from 'components/Header'
import { gamesCol } from 'utils/firebase'
import { getGamesForRating } from 'utils/queries'

type Tag = 'bg' | 'good' | 'other' | 'rpg' | 'stl'

export async function getStaticProps() {
  return {
    props: {
      protected: true
    }
  }
}

export default function Admin() {
  const [games, setGames] = useState<Game[]>([])
  const [recommend, setRecommend] = useState(false)

  const handleButtonClick = (gameId: string, tag: Tag) => {
    const tags: Tag[] = []
    const gameRef = doc(gamesCol, gameId)
    tags.push(tag)
    if (recommend) {
      tags.push('good')
    }
    updateDoc(gameRef, { tags })
    setRecommend(false)
    setGames(games.filter((game) => game.id !== gameId))
  }

  useEffect(() => {
    async function fetchData() {
      setGames(await getGamesForRating())
    }
    fetchData()
  }, [])

  if (games.length === 0) {
    return (
      <div className="mt-10 flex w-full justify-center">
        <Alert className="w-96 bg-secondary text-center">
          No more games to rate!
        </Alert>
      </div>
    )
  }

  return (
    <div>
      <Header title="Admin" />
      <div className="flex w-full justify-center">
        <GameTile game={games[0]} />
      </div>
      <form className="fixed bottom-28 right-0 w-52 flex-col pr-6">
        <Card className="m-2 h-10 w-full">
          <div className="m-2">
            <Switch
              checked={recommend}
              name="recommend"
              label="Recommend"
              onChange={() => setRecommend(!recommend)}
            />
          </div>
        </Card>
        <Button
          className="m-2 w-full"
          size="lg"
          onClick={() => handleButtonClick(games[0].id, 'bg')}
        >
          Board game
        </Button>
        <Button
          className="m-2 w-full "
          size="lg"
          onClick={() => handleButtonClick(games[0].id, 'rpg')}
        >
          Role-play
        </Button>
        <Button
          className="m-2 w-full "
          size="lg"
          onClick={() => handleButtonClick(games[0].id, 'stl')}
        >
          STL
        </Button>
        <Button
          className="m-2 w-full "
          size="lg"
          onClick={() => handleButtonClick(games[0].id, 'other')}
        >
          Other
        </Button>
      </form>
    </div>
  )
}
