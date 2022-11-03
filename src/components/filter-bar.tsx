import Link from 'next/link'
import { useRouter } from 'next/router'
import { MouseEventHandler } from 'react'
import { BagFill, Boxes, HeartFill } from 'react-bootstrap-icons'
import SideBarIcon from './side-bar-icon'
import SvgBookCover from 'svg/book-cover.svg'
import SvgMeeple from 'svg/meeple.svg'

type Props = {
  switchFilters: MouseEventHandler<HTMLButtonElement>
}

const filters = [
  {
    id: 'f1',
    element: 'icon',
    icon: <HeartFill size={34} />,
    to: '/filter/recommended',
    tooltip: 'Recommended'
  },
  { id: 'f2', element: 'divider' },
  {
    id: 'f3',
    element: 'icon',
    icon: <SvgMeeple />,
    to: '/filter/board-games',
    tooltip: 'Board Games'
  },
  {
    id: 'f4',
    element: 'icon',
    icon: <SvgBookCover />,
    to: '/filter/role-playing-games',
    tooltip: 'Role-playing games'
  },
  {
    id: 'f6',
    element: 'icon',
    icon: <Boxes size={34} />,
    to: '/filter/stl',
    tooltip: 'STL files'
  },
  {
    id: 'f5',
    element: 'icon',
    icon: <BagFill size={34} />,
    to: '/filter/gaming-accessories',
    tooltip: 'Gaming accessories'
  }
]

const FilterBar = (props: Props) => {
  const router = useRouter()
  return (
    <>
      {filters.map((filter) => {
        if (filter.element === 'icon' && filter.to) {
          return (
            <div key={filter.id}>
              <Link href={filter.to} passHref>
                <a>
                  <SideBarIcon
                    active={router.route === filter.to}
                    icon={filter.icon}
                    onClick={props.switchFilters}
                    tooltip={filter.tooltip}
                  />
                </a>
              </Link>
            </div>
          )
        } else {
          return <hr className="sidebar-hr" key={filter.id} />
        }
      })}
    </>
  )
}

export default FilterBar
