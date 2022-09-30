import { IconButton, Tooltip } from '@material-tailwind/react'
import classNames from 'classnames'
import { MouseEventHandler } from 'react'
import { ArrowBarLeft, ArrowBarRight } from 'react-bootstrap-icons'
import DarthVader from 'svg/darth-vader.svg'
import Kicktracker from 'svg/kicktracker.svg'

type Props = {
  darthMode: boolean
  switchDarthMode: MouseEventHandler<HTMLButtonElement>
  menuClosed: boolean
  switchMenu: MouseEventHandler<HTMLElement>
}

export default function LogoHeader(props: Props) {
  return (
    <div
      className={classNames(
        'fixed z-30 flex w-80 flex-col bg-white transition-width',
        { 'w-20': props.menuClosed },
        { 'w-80': !props.menuClosed }
      )}
    >
      <div className="m-4 flex flex-wrap gap-2 self-end">
        {!props.menuClosed && (
          <Tooltip
            className="bg-secondary"
            content={props.darthMode ? 'Anakin mode' : 'Darth mode'}
            placement="bottom"
          >
            <IconButton
              className="self-end text-white"
              color="blue-gray"
              onClick={props.switchDarthMode}
              size="lg"
            >
              <DarthVader />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip
          className="bg-secondary"
          content={props.menuClosed ? 'Open menu' : 'Close menu'}
          placement="bottom"
        >
          <IconButton color="blue-gray" onClick={props.switchMenu} size="lg">
            {props.menuClosed ? <ArrowBarRight /> : <ArrowBarLeft />}
          </IconButton>
        </Tooltip>
      </div>
      <div className="flex flex-col">
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4 pl-1">
            <div className="ml-1 w-16">
              <Kicktracker />
            </div>
            <span
              className={classNames('font-title text-2xl text-primary', {
                hidden: props.menuClosed
              })}
            >
              Kicktracker
            </span>
          </div>
        </div>
      </div>
      <div
        className={classNames(
          'm-4 overflow-hidden whitespace-nowrap text-lg font-extrabold text-blue-gray-800 dark:text-gray-50',
          {
            invisible: props.menuClosed
          }
        )}
      >
        Your crowdfunding filter
      </div>
    </div>
  )
}
