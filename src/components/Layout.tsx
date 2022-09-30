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
          'fixed  left-0 top-0 z-20 hidden h-screen flex-col bg-white pt-44 shadow-lg transition-width dark:bg-gray-900  md:flex',
          { 'w-20': menuClosed },
          { 'w-80': !menuClosed }
        )}
      >
        <SideBar
          darthMode={darthMode}
          menuClosed={menuClosed}
          switchFilters={switchFilters}
        />
      </nav>
      <div
        className={classNames(
          'filter-menu',
          { 'md:left-20': filtersVisible && menuClosed },
          { 'md:left-80': filtersVisible && !menuClosed },
          { 'md:left-0': !filtersVisible }
        )}
      >
        <FilterBar switchFilters={switchFilters} />
      </div>
      <main
        className={classNames(
          'min-h-screen flex-1 bg-gradient-to-r from-orange-400 via-primary to-orange-600 transition-width dark:from-gray-800 dark:via-gray-900 dark:to-gray-900',
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
