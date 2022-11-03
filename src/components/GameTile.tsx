import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Tooltip,
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
    <Card className="mt-7 w-full flex-col text-blue-gray-500 dark:bg-secondary dark:text-gray-300 sm:w-96">
      <a href={props.game.urls.home} target={`${props.game.platform}`}>
        <CardHeader color="blue-gray" className="relative h-56 dark:opacity-90">
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
        {props.game.tags && props.game.tags.includes('good') && (
          <Tooltip content="recommended" placement="left">
            <Chip className="m-1" color="orange" value="&hearts;" />
          </Tooltip>
        )}
        {props.game.tags && props.game.tags.includes('bg') && (
          <Chip className="m-1" color="green" value="board game" />
        )}
        {props.game.tags && props.game.tags.includes('rpg') && (
          <Chip className="m-1" color="cyan" value="role-playing game" />
        )}
        {props.game.tags && props.game.tags.includes('other') && (
          <Chip className="m-1" color="blue" value="accessory" />
        )}
        {props.game.tags && props.game.tags.includes('stl') && (
          <Chip className="m-1" color="deep-purple" value="STL-file" />
        )}
        <div className="line-clamp-5">
          <Typography>{props.game.short}</Typography>
        </div>
      </CardBody>
      <CardFooter divider className="flex items-center justify-between py-3">
        <Typography variant="small">
          {daysLeft(props.game.dates.end)} days left
        </Typography>
        <a href={props.game.urls.home} target={`${props.game.platform}`}>
          <Typography
            variant="small"
            className="flex gap-1 capitalize text-primary"
          >
            {props.game.platform}
          </Typography>
        </a>
      </CardFooter>
    </Card>
  )
}

export default GameTile
// https://tailwindcomponents.com/component/material-design-card-1
