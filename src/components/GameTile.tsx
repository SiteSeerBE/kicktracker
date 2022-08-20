import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography
} from '@material-tailwind/react'
import Link from 'next/link'
import Boxart from './Boxart'

type Props = {
  game: Game
}

const daysLeft = (epoch: number) => {
  return Math.floor((epoch * 1000 - Date.now()) / 86400000)
}

const GameTile = (props: Props) => {
  return (
    <Card className="mt-7 w-96 flex-col">
      <CardHeader color="light-green" className="relative h-56">
        <a href={props.game.urls.home} target={`${props.game.platform}`}>
          <Boxart localImage={props.game.urls.localImage} />
        </a>
      </CardHeader>
      <CardBody className="flex-1 text-center">
        <Typography variant="h5" className="mb-2">
          {props.game.name}
        </Typography>
        <Typography>{props.game.short}</Typography>
      </CardBody>
      <CardFooter divider className="flex items-center justify-between py-3">
        <Typography variant="small">
          {daysLeft(props.game.dates.end)} days left
        </Typography>
        <Typography
          variant="small"
          color="gray"
          className="flex gap-1 capitalize"
        >
          {props.game.platform}
        </Typography>
      </CardFooter>
    </Card>
  )
}

export default GameTile
// https://tailwindcomponents.com/component/material-design-card-1
