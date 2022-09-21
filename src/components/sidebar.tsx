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
    <>
      <SideBarIcon
        active={router.route === '/'}
        icon={<HouseFill size={36} />}
        to="/"
        tooltip="Home"
      />
      <SignInOutButton user={user} />
      {isAdmin && (
        <>
          <Divider />
          <SideBarIcon
            active={router.route === '/admin/components'}
            icon={<CpuFill size={34} />}
            to="/admin/components"
            tooltip="Components"
          />
          <SideBarIcon
            active={router.route === '/admin/tinder'}
            icon={<LockFill size={34} />}
            to="/admin/tinder"
            tooltip="Tinder"
          />
        </>
      )}
      <FunnelFill size={46} className="mt-12 self-center fill-primary" />
      <SideBarIcon
        active={router.route === '/recommended'}
        icon={<HeartFill size={34} />}
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
        icon={<BrushFill size={34} />}
        to="/gaming-things"
        tooltip="Other stuff"
      />
    </>
  )
}

const Divider = () => <hr className="sidebar-hr" />

export default SideBar
