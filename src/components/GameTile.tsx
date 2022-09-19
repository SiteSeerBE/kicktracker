import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography
} from '@material-tailwind/react'
import Image from 'next/image'

type Props = {
  game: Game
}

const daysLeft = (epoch: number) => {
  const day = 86400000 // miliseconds in a day
  return Math.floor((epoch * 1000 - Date.now()) / day)
}

const GameTile = (props: Props) => {
  return (
    <Card className="mt-7 w-full flex-col text-blue-gray-500 dark:bg-blue-gray-800 dark:text-blue-gray-200 sm:w-96">
      <a href={props.game.urls.home} target={`${props.game.platform}`}>
        <CardHeader color="blue-gray" className="relative h-56 dark:opacity-70">
          <Image
            blurDataURL={`https://images.kicktracker.be/low/${props.game.urls.localImage}`}
            placeholder="blur"
            src={`https://images.kicktracker.be/medium/${props.game.urls.localImage}`}
            alt="box image"
            layout="fill"
          />
        </CardHeader>
      </a>

      <CardBody className="flex-1 text-center">
        <Typography
          variant="h5"
          className="mb-2 text-blue-gray-900 dark:text-white"
        >
          {props.game.name}
        </Typography>
        <Typography>{props.game.short}</Typography>
      </CardBody>
      <CardFooter divider className="flex items-center justify-between py-3">
        <Typography variant="small">
          {daysLeft(props.game.dates.end)} days left
        </Typography>
        <Typography variant="small" className="flex gap-1 capitalize">
          {props.game.platform}
        </Typography>
      </CardFooter>
    </Card>
  )
}

export default GameTile
// https://tailwindcomponents.com/component/material-design-card-1
