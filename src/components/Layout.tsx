import { PropsWithChildren } from 'react'
import SideBar from './sidebar'

const Layout = (props: PropsWithChildren<any>) => {
  return (
    <div className="flex">
      <SideBar />
      <main className="ml-16 min-h-screen flex-1 bg-gradient-to-r from-orange-400 via-primary to-orange-400">
        {props.children}
      </main>
    </div>
  )
}

export default Layout
