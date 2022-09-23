import { PropsWithChildren, useState } from 'react'
import FilterBar from './filter-bar'
import SideBar from './sidebar'

const Layout = (props: PropsWithChildren<any>) => {
  const [filtersVisible, setFiltersVisible] = useState(false)
  function switchFilters(): void {
    setFiltersVisible(!filtersVisible)
  }
  return (
    <div className="flex">
      <nav
        className="fixed top-0 left-0 z-20 flex h-screen w-20 flex-col
                  bg-white shadow-lg dark:bg-gray-900"
      >
        <SideBar switchFilters={switchFilters} />
      </nav>
      <div className={`filter-menu ${filtersVisible ? 'left-20' : 'left-0'}`}>
        <FilterBar switchFilters={switchFilters} />
      </div>
      <main className="ml-16 min-h-screen flex-1 bg-gradient-to-r from-orange-400 via-primary to-orange-400">
        {props.children}
      </main>
    </div>
  )
}

export default Layout
