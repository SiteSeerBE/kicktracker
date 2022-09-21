import { PropsWithChildren } from 'react'
import SideBar from './sidebar'

const Layout = (props: PropsWithChildren<any>) => {
  return (
    <div className="flex">
      <nav
        className="fixed top-0 left-0 z-10 flex h-screen w-20 flex-col
                  bg-white shadow-lg dark:bg-gray-900"
      >
        <SideBar />
      </nav>
      <main className="ml-16 min-h-screen flex-1 bg-gradient-to-r from-orange-400 via-primary to-orange-400">
        {props.children}
      </main>
    </div>
  )
}

export default Layout
