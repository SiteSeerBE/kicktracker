import { IconButton, Tooltip } from '@material-tailwind/react'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MouseEventHandler } from 'react'
import {
  ArrowBarLeft,
  ArrowBarRight,
  CpuFill,
  FunnelFill,
  HouseFill,
  LockFill
} from 'react-bootstrap-icons'
import { SignInOutButton } from './auth/sign-in-out-button'
import SideBarIcon from './side-bar-icon'
import { useUserAuth } from 'context/UserAuthContext'
import Kicktracker from 'svg/kicktracker.svg'

type Props = {
  menuClosed: boolean
  switchFilters: MouseEventHandler<HTMLButtonElement>
  switchMenu: MouseEventHandler<HTMLButtonElement>
}

const SideBar = (props: Props) => {
  const router = useRouter()
  const { isAdmin, user } = useUserAuth()
  const menuItemClass = classNames(
    'cursor-pointer my-1 flex h-full w-full items-center',
    {
      'px-3': !props.menuClosed
    }
  )
  return (
    <>
      <Tooltip
        placement="right"
        content={props.menuClosed ? 'Open menu' : 'Close menu'}
      >
        <IconButton
          className={classNames(
            'self-end',
            { 'mx-4 my-6': props.menuClosed },
            { 'm-6': !props.menuClosed }
          )}
          color="blue-gray"
          onClick={props.switchMenu}
          size="lg"
        >
          {props.menuClosed ? <ArrowBarRight /> : <ArrowBarLeft />}
        </IconButton>
      </Tooltip>
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
          'm-4 overflow-hidden whitespace-nowrap text-lg font-extrabold text-blue-gray-800',
          {
            invisible: props.menuClosed
          }
        )}
      >
        Your crowdfunding filter
      </div>
      <div className="mt-4 flex flex-col">
        <Link href="/" passHref>
          <a className={menuItemClass}>
            <SideBarIcon
              active={router.route === '/'}
              icon={<HouseFill size={36} />}
              tooltip={props.menuClosed ? 'Home' : undefined}
            />
            {!props.menuClosed && (
              <span className="ml-4 grow text-lg">Home</span>
            )}
          </a>
        </Link>
        <a className={menuItemClass}>
          <SideBarIcon
            active={router.route.includes('/filter')}
            icon={<FunnelFill size={36} />}
            onClick={props.switchFilters}
            tooltip={props.menuClosed ? 'Filters' : undefined}
          />
          {!props.menuClosed && (
            <span className="ml-4 grow text-lg">Filters</span>
          )}
        </a>
        {isAdmin && (
          <>
            <Divider />
            <Link href="/admin/components" passHref>
              <a className={menuItemClass}>
                <SideBarIcon
                  active={router.route === '/admin/components'}
                  icon={<CpuFill size={34} />}
                  tooltip={props.menuClosed ? 'Components' : undefined}
                />
                {!props.menuClosed && (
                  <span className="ml-4 grow text-lg">Components</span>
                )}
              </a>
            </Link>
            <Link href="/admin/tinder" passHref>
              <a className={menuItemClass}>
                <SideBarIcon
                  active={router.route === '/admin/tinder'}
                  icon={<LockFill size={34} />}
                  tooltip={props.menuClosed ? 'Tinder' : undefined}
                />
                {!props.menuClosed && (
                  <span className="ml-4 grow text-lg">Tinder</span>
                )}
              </a>
            </Link>
          </>
        )}
      </div>
      <div className="grow">&nbsp;</div>
      <div className="border-t-2">
        <Link href="/sign-in" passHref>
          <a className={menuItemClass}>
            <SignInOutButton user={user} menuClosed={props.menuClosed} />
          </a>
        </Link>
      </div>
    </>
  )
}

const Divider = () => <hr className="sidebar-hr" />

export default SideBar
