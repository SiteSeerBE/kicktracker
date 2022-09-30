import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MouseEventHandler } from 'react'
import { CpuFill, FunnelFill, HouseFill, LockFill } from 'react-bootstrap-icons'
import { SignInOutButton } from './auth/sign-in-out-button'
import SideBarIcon from './side-bar-icon'
import { useUserAuth } from 'context/UserAuthContext'

type Props = {
  menuClosed: boolean
  switchFilters: MouseEventHandler<HTMLElement>
}

const SideBar = (props: Props) => {
  const router = useRouter()
  const { isAdmin, user } = useUserAuth()
  const menuItemClass = classNames(
    'menu-item cursor-pointer my-1 flex md:h-full md:w-full items-center whitespace-nowrap group',
    {
      'px-3': !props.menuClosed
    }
  )
  return (
    <>
      <div className="flex justify-center text-gray-900 dark:text-gray-300 md:w-full md:flex-col">
        <Link href="/" passHref>
          <a className={menuItemClass}>
            <SideBarIcon
              active={router.route === '/'}
              hideTooltip={!props.menuClosed}
              icon={<HouseFill size={36} />}
              tooltip="Home"
            />
            {!props.menuClosed && <span className="menu-label">Home</span>}
          </a>
        </Link>
        <a className={menuItemClass} onClick={props.switchFilters}>
          <SideBarIcon
            active={router.route.includes('/filter')}
            hideTooltip={!props.menuClosed}
            icon={<FunnelFill size={36} />}
            tooltip="Filters"
          />
          {!props.menuClosed && <span className="menu-label">Filters</span>}
        </a>
        {isAdmin && (
          <>
            <Divider />
            <Link href="/admin/components" passHref>
              <a className={menuItemClass}>
                <SideBarIcon
                  active={router.route === '/admin/components'}
                  hideTooltip={!props.menuClosed}
                  icon={<CpuFill size={34} />}
                  tooltip="Components"
                />
                {!props.menuClosed && (
                  <span className="menu-label">Components</span>
                )}
              </a>
            </Link>
            <Link href="/admin/tinder" passHref>
              <a className={menuItemClass}>
                <SideBarIcon
                  active={router.route === '/admin/tinder'}
                  hideTooltip={!props.menuClosed}
                  icon={<LockFill size={34} />}
                  tooltip="Tinder"
                />
                {!props.menuClosed && (
                  <span className="menu-label">Tinder</span>
                )}
              </a>
            </Link>
          </>
        )}
      </div>
      <div className="hidden md:block md:grow">&nbsp;</div>
      <div className="border-t-2 text-gray-900 dark:text-gray-300 md:w-full">
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
