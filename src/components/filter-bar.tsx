import { useRouter } from 'next/router'
import { BrushFill, HeartFill } from 'react-bootstrap-icons'
import SideBarIcon from './side-bar-icon'
import SvgBookCover from 'svg/book-cover.svg'
import SvgMeeple from 'svg/meeple.svg'

const FilterBar = () => {
  const router = useRouter()
  return (
    <>
      <SideBarIcon
        active={router.route === '/recommended'}
        icon={<HeartFill size={34} />}
        to="/filter/recommended"
        tooltip="Recommended"
      />
      <Divider />
      <SideBarIcon
        active={router.route === '/board-games'}
        icon={<SvgMeeple />}
        to="/filter/board-games"
        tooltip="Board games &hearts;"
      />
      <SideBarIcon
        active={router.route === '/role-playing-games'}
        icon={<SvgBookCover />}
        to="/filter/role-playing-games"
        tooltip="Role-playing games"
      />
      <SideBarIcon
        active={router.route === '/gaming-things'}
        icon={<BrushFill size={34} />}
        to="/filter/gaming-things"
        tooltip="Other stuff"
      />
    </>
  )
}

const Divider = () => <hr className="sidebar-hr" />

export default FilterBar
