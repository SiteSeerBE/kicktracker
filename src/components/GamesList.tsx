import GameTile from './GameTile'

type Props = {
  games: Game[]
}

const GamesList = (props: Props) => {
  return (
    <>
      {props.games.map((game) => (
        <GameTile game={game} key={game.id} />
      ))}
    </>
  )
}

export default GamesList
