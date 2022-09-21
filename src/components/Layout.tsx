import Link from 'next/link'
import { PropsWithChildren } from 'react'
import { CpuFill, HouseFill, LockFill } from 'react-bootstrap-icons'
import FilterButton from './FilterButton'
import { SignInOutButton } from './auth/sign-in-out-button'
import { KicktrackerLogo } from './kicktracker-logo'
import SideBar from './sidebar'
import { useUserAuth } from 'context/UserAuthContext'
import useDarkMode from 'utils/useDarkMode'

const Layout = (props: PropsWithChildren<any>) => {
  const { isAdmin, user } = useUserAuth()
  const { mode, setMode } = useDarkMode()
  return (
    <div className="flex">
      <SideBar />
      <main className="ml-14 min-h-screen flex-1 bg-gradient-to-r from-orange-400 via-primary to-orange-400">
        {props.children}
      </main>
    </div>
  )
}

export default Layout
