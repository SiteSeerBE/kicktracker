import GameTile from './GameTile'

type Props = {
  games: Game[]
}

const GamesList = (props: Props) => {
  return (
    <div className="flex flex-wrap justify-center gap-10 p-5">
      {props.games.map((game) => (
        <GameTile game={game} key={game.id} />
      ))}
    </div>
  )
}

export default GamesList
