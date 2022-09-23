import { Button, IconButton } from '@material-tailwind/react'
import classNames from 'classnames'
import { PropsWithChildren, useState } from 'react'
import { ArrowBarLeft, ArrowBarRight } from 'react-bootstrap-icons'
import FilterBar from './filter-bar'
import SideBar from './sidebar'

const Layout = (props: PropsWithChildren<any>) => {
  const [filtersVisible, setFiltersVisible] = useState(false)
  const [menuClosed, setMenuClosed] = useState(false)
  function switchFilters(): void {
    setFiltersVisible(!filtersVisible)
  }
  function switchMenu(): void {
    setMenuClosed(!menuClosed)
  }

  return (
    <div className="flex">
      <nav
        className={classNames(
          'fixed top-0 left-0 z-20 flex h-screen flex-col bg-white shadow-lg transition-width dark:bg-gray-900',
          { 'w-20': menuClosed },
          { 'w-80': !menuClosed }
        )}
      >
        <SideBar
          menuClosed={menuClosed}
          switchFilters={switchFilters}
          switchMenu={switchMenu}
        />
      </nav>
      <div
        className={classNames(
          'filter-menu',
          { 'left-20': filtersVisible && menuClosed },
          { 'left-80': filtersVisible && !menuClosed },
          { 'left-0': !filtersVisible }
        )}
      >
        <FilterBar switchFilters={switchFilters} />
      </div>
      <main
        className={classNames(
          'min-h-screen flex-1 bg-gradient-to-r from-orange-400 via-primary to-orange-400 transition-width',
          { 'pl-20': menuClosed },
          { 'pl-96': !menuClosed }
        )}
      >
        {props.children}
      </main>
    </div>
  )
}

export default Layout
