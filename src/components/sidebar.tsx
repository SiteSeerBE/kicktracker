import { useRouter } from 'next/router'
import { MouseEventHandler } from 'react'
import { CpuFill, FunnelFill, HouseFill, LockFill } from 'react-bootstrap-icons'
import { SignInOutButton } from './auth/sign-in-out-button'
import SideBarIcon from './side-bar-icon'
import { useUserAuth } from 'context/UserAuthContext'

type Props = {
  switchFilters: MouseEventHandler<HTMLButtonElement>
}

const SideBar = (props: Props) => {
  const router = useRouter()
  const { isAdmin, user } = useUserAuth()
  return (
    <>
      <SideBarIcon
        active={router.route.includes('/filter')}
        icon={<HouseFill size={36} />}
        to="/"
        tooltip="Home"
      />
      <SideBarIcon
        active={router.route === '/'}
        icon={<FunnelFill size={36} />}
        to={props.switchFilters}
        tooltip="Filters"
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
    </>
  )
}

const Divider = () => <hr className="sidebar-hr" />

export default SideBar
