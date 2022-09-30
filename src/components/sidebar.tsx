import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MouseEventHandler } from 'react'
import { CpuFill, FunnelFill, HouseFill, LockFill } from 'react-bootstrap-icons'
import { SignInOutButton } from './auth/sign-in-out-button'
import SideBarIcon from './side-bar-icon'
import { useUserAuth } from 'context/UserAuthContext'

type Props = {
  darthMode: boolean
  menuClosed: boolean
  switchFilters: MouseEventHandler<HTMLElement>
}

const SideBar = (props: Props) => {
  const router = useRouter()
  const { isAdmin, user } = useUserAuth()
  const menuItemClass = classNames(
    'menu-item cursor-pointer my-1 flex h-full w-full items-center whitespace-nowrap group',
    {
      'px-3': !props.menuClosed
    }
  )
  return (
    <>
      <div className="mt-4 flex flex-col text-gray-900 dark:text-gray-300">
        <Link href="/" passHref>
          <a className={menuItemClass}>
            <SideBarIcon
              active={router.route === '/'}
              icon={<HouseFill size={36} />}
              tooltip={props.menuClosed ? 'Home' : undefined}
            />
            {!props.menuClosed && (
              <span className="ml-4 grow rounded-lg bg-gray-300/0 p-4 text-lg transition-colors group-hover:bg-gray-300/100 dark:bg-secondary/0 dark:group-hover:bg-secondary/100">
                Home
              </span>
            )}
          </a>
        </Link>
        <a className={menuItemClass} onClick={props.switchFilters}>
          <SideBarIcon
            active={router.route.includes('/filter')}
            icon={<FunnelFill size={36} />}
            tooltip={props.menuClosed ? 'Filters' : undefined}
          />
          {!props.menuClosed && (
            <span className="ml-4 grow rounded-lg bg-gray-300/0 p-4 text-lg transition-colors group-hover:bg-gray-300/100 dark:bg-secondary/0 dark:group-hover:bg-secondary/100">
              Filters
            </span>
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
                  <span className="ml-4 grow rounded-lg bg-gray-300/0 p-4 text-lg transition-colors group-hover:bg-gray-300/100 dark:bg-secondary/0 dark:group-hover:bg-secondary/100">
                    Components
                  </span>
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
                  <span className="ml-4 grow rounded-lg bg-gray-300/0 p-4 text-lg transition-colors group-hover:bg-gray-300/100 dark:bg-secondary/0 dark:group-hover:bg-secondary/100">
                    Tinder
                  </span>
                )}
              </a>
            </Link>
          </>
        )}
      </div>
      <div className="grow">&nbsp;</div>
      <div className="border-t-2 text-gray-900 dark:text-gray-300">
        <Link href="/sign-in" passHref>
          <a className={menuItemClass}>
            <SignInOutButton menuClosed={props.menuClosed} user={user} />
          </a>
        </Link>
      </div>
    </>
  )
}

const Divider = () => <hr className="sidebar-hr" />

export default SideBar
