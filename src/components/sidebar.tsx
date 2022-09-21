import { useRouter } from 'next/router'
import {
  BrushFill,
  CpuFill,
  FunnelFill,
  HeartFill,
  HouseFill,
  LockFill
} from 'react-bootstrap-icons'
import { SignInOutButton } from './auth/sign-in-out-button'
import SideBarIcon from './side-bar-icon'
import { useUserAuth } from 'context/UserAuthContext'
import SvgBookCover from 'svg/book-cover.svg'
import SvgMeeple from 'svg/meeple.svg'

const SideBar = () => {
  const router = useRouter()
  const { isAdmin, user } = useUserAuth()
  return (
    <nav
      className="fixed top-0 left-0 z-10 flex h-screen w-16 flex-col
                  bg-white shadow-lg dark:bg-gray-900"
    >
      <SideBarIcon
        active={router.route === '/'}
        icon={<HouseFill size={30} />}
        to="/"
        tooltip="Home"
      />
      <SignInOutButton user={user} />
      {isAdmin && (
        <>
          <Divider />
          <SideBarIcon
            active={router.route === '/admin/components'}
            icon={<CpuFill size={28} />}
            to="/admin/components"
            tooltip="Components"
          />
          <SideBarIcon
            active={router.route === '/admin/tinder'}
            icon={<LockFill size={28} />}
            to="/admin/tinder"
            tooltip="Tinder"
          />
        </>
      )}
      <FunnelFill size={36} className="mt-10 self-center fill-primary" />
      <SideBarIcon
        active={router.route === '/recommended'}
        icon={<HeartFill size={26} />}
        to="/recommended"
        tooltip="Recommended"
      />
      <Divider />
      <SideBarIcon
        active={router.route === '/board-games'}
        icon={<SvgMeeple />}
        to="/board-games"
        tooltip="Board games &hearts;"
      />
      <SideBarIcon
        active={router.route === '/role-playing-games'}
        icon={<SvgBookCover />}
        to="/role-playing-games"
        tooltip="Role-playing games"
      />
      <SideBarIcon
        active={router.route === '/gaming-things'}
        icon={<BrushFill size={24} />}
        to="/gaming-things"
        tooltip="Other stuff"
      />
    </nav>
  )
}

const Divider = () => <hr className="sidebar-hr" />

export default SideBar
