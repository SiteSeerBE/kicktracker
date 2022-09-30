import classNames from 'classnames'
import { PropsWithChildren, useState } from 'react'
import FilterBar from './filter-bar'
import LogoHeader from './logo-header'
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
      <LogoHeader
        darthMode={darthMode}
        menuClosed={menuClosed}
        switchDarthMode={switchDarthMode}
        switchMenu={switchMenu}
      />
      <nav
        className={classNames(
          'fixed left-0 bottom-0 z-20 flex items-center justify-center bg-white shadow-lg transition-all dark:bg-gray-900 md:top-0 md:h-screen md:flex-col md:items-start md:justify-items-start md:pt-52',
          { 'w-20': menuClosed },
          { 'w-screen md:w-80': !menuClosed }
        )}
      >
        <SideBar menuClosed={menuClosed} switchFilters={switchFilters} />
      </nav>
      <div
        className={classNames(
          'filter-menu',
          { 'bottom-0 md:left-20': filtersVisible && menuClosed },
          { 'bottom-20 md:bottom-0 md:left-80': filtersVisible && !menuClosed },
          { 'bottom-0 md:left-0': !filtersVisible }
        )}
      >
        <FilterBar switchFilters={switchFilters} />
      </div>
      <main
        className={classNames(
          'mt-20 min-h-screen flex-1 bg-gradient-to-r from-orange-400 via-primary to-orange-600 transition-width dark:from-gray-800 dark:via-gray-900 dark:to-gray-900 md:mt-0',
          { 'md:pl-20': menuClosed },
          { 'md:pl-80': !menuClosed }
        )}
      >
        {props.children}
      </main>
    </div>
  )
}

export default Layout
