import { Button, IconButton } from '@material-tailwind/react'
import classNames from 'classnames'
import { PropsWithChildren, useState } from 'react'
import { ArrowBarLeft, ArrowBarRight } from 'react-bootstrap-icons'
import FilterBar from './filter-bar'
import SideBar from './sidebar'

const Layout = (props: PropsWithChildren<any>) => {
  const [filtersVisible, setFiltersVisible] = useState(false)
  const [menuClosed, setMenuClosed] = useState(false)
  const [darthMode, setDarthMode] = useState(false)
  function switchFilters(): void {
    setFiltersVisible(!filtersVisible)
  }
  function switchMenu(): void {
    setMenuClosed(!menuClosed)
  }
  function switchDarthMode(): void {
    setDarthMode(!darthMode)
  }

  return (
    <div className={classNames('flex', { dark: darthMode })}>
      <nav
        className={classNames(
          'fixed left-0 z-20 flex h-screen flex-col bg-white shadow-lg transition-width dark:bg-gray-900 md:top-0',
          { 'w-20': menuClosed },
          { 'w-80': !menuClosed }
        )}
      >
        <SideBar
          darthMode={darthMode}
          switchDarthMode={switchDarthMode}
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
          'min-h-screen flex-1 bg-gradient-to-r from-orange-400 via-primary to-orange-600 transition-width dark:from-gray-800 dark:via-gray-900 dark:to-gray-900',
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
