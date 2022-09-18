import Link from 'next/link'
import { PropsWithChildren } from 'react'
import { CpuFill, HouseFill } from 'react-bootstrap-icons'
import { SignInOutButton } from './auth/sign-in-out-button'
import { KicktrackerLogo } from './kicktracker-logo'
import { useUserAuth } from 'context/UserAuthContext'
import useDarkMode from 'utils/useDarkMode'

const Layout = (props: PropsWithChildren<any>) => {
  const { isAdmin, user } = useUserAuth()
  const { mode, setMode } = useDarkMode()
  return (
    <div className={mode}>
      <div className="flex min-h-screen flex-row justify-start bg-gradient-to-r from-orange-700 via-orange-600 to-orange-400 dark:from-blue-gray-900 dark:via-blue-gray-900 dark:to-blue-gray-900">
        <nav className="fixed left-0 top-0 hidden h-screen w-72 bg-blue-gray-800 p-4 pt-16 transition-width md:block">
          <div className="flex h-full flex-col gap-1">
            <KicktrackerLogo />
            <div className="flex w-full cursor-pointer items-center overflow-hidden whitespace-nowrap rounded p-2 text-white hover:bg-blue-gray-400">
              <Link href="/">
                <a className="flex h-full w-full items-center">
                  <div>
                    <HouseFill size={30} />
                  </div>
                  <span className="ml-2 mt-2 text-2xl text-white">Home</span>
                </a>
              </Link>
            </div>
            {isAdmin && (
              <div className="flex w-full cursor-pointer items-center overflow-hidden whitespace-nowrap rounded p-2 text-white hover:bg-blue-gray-400">
                <Link href="/components">
                  <a className="flex h-full w-full items-center">
                    <div>
                      <CpuFill size={30} />
                    </div>
                    <span className="ml-2 mt-2 text-2xl text-white">
                      Components
                    </span>
                  </a>
                </Link>
              </div>
            )}
            <SignInOutButton user={user} />
          </div>
        </nav>
        <main className="min-h-screen flex-1 md:ml-72">{props.children}</main>
      </div>
    </div>
  )
}

export default Layout
