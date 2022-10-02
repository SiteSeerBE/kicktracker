import { IconButton, Tooltip } from '@material-tailwind/react'
import classNames from 'classnames'
import { MouseEventHandler, useEffect, useState } from 'react'
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
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset
    const visible = prevScrollPos > currentScrollPos
    setPrevScrollPos(currentScrollPos)
    setVisible(visible)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  return (
    <div
      className={classNames(
        'fixed z-30 flex w-screen items-center justify-between overflow-hidden bg-white pr-4 transition-all dark:bg-gray-900 md:flex-col md:items-start md:pr-0',
        { 'md:w-20': props.menuClosed },
        { 'md:w-80': !props.menuClosed },
        { 'h-20 md:h-52': visible },
        { 'h-0 md:h-52': !visible }
      )}
    >
      <div className="order-3 m-4 flex flex-wrap gap-2 self-end justify-self-end md:order-1">
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
          <IconButton
            color="blue-gray"
            onClick={props.switchMenu}
            size="lg"
            className="hidden md:block"
          >
            {props.menuClosed ? <ArrowBarRight /> : <ArrowBarLeft />}
          </IconButton>
        </Tooltip>
      </div>
      <div className="relative order-1 flex md:order-2">
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
      <div
        className={classNames(
          'order-2 m-4 hidden overflow-hidden whitespace-nowrap text-lg font-extrabold text-blue-gray-800 dark:text-gray-50 md:order-3 md:block',
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
