import Image from 'next/image'
import Link from 'next/link'
import { type ReactNode } from 'react'
import { CpuFill, HouseFill } from 'react-bootstrap-icons'
import useDarkMode from 'utils/useDarkMode'

type Props = {
  children: ReactNode
}

const Layout = (props: Props) => {
  const { mode, setMode } = useDarkMode()
  return (
    <div className={mode}>
      <div className="flex min-h-screen flex-row justify-start bg-gradient-to-r from-orange-700 via-orange-600 to-orange-400 dark:from-blue-gray-900 dark:via-blue-gray-900 dark:to-blue-gray-900">
        <nav className="fixed left-0 top-0 hidden h-screen w-72 flex-col justify-between bg-blue-gray-800 p-4 transition-width md:block">
          <div className="mt-12 flex flex-col">
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Image
                  height={40}
                  width={40}
                  src="/images/rocket.svg"
                  alt="Kicktracker logo"
                />
                <span className="mt-2 font-title text-2xl text-orange-700">
                  Kicktracker
                </span>
              </div>
            </div>
            <div className="text-lg font-extrabold text-blue-gray-200">
              Your Crowdfunding Filter
            </div>
            <div className="mt-10 flex flex-col items-start">
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
            </div>
          </div>
        </nav>
        <main className="flex-1 md:ml-72">
          <div>{props.children}</div>
        </main>
      </div>
    </div>
  )
}

export default Layout
