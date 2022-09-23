import Link from 'next/link'
import { MouseEventHandler } from 'react'

type SideBarIconProps = {
  icon: any
  active?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  to?: string
  tooltip?: string
}

const SideBarIcon = ({
  icon,
  active = false,
  onClick,
  to,
  tooltip
}: SideBarIconProps) => {
  if (to) {
    return (
      <Link href={to} passHref>
        <button
          className={`sidebar-icon group p-2 ${active ? 'active' : null}`}
          onClick={onClick}
        >
          {icon}
          {!!tooltip && (
            <span className="sidebar-tooltip group-hover:scale-100">
              {tooltip}
            </span>
          )}
        </button>
      </Link>
    )
  }
  return (
    <button className={`sidebar-icon group p-2`} onClick={onClick}>
      {icon}
      {!!tooltip && (
        <span className="sidebar-tooltip group-hover:scale-100">{tooltip}</span>
      )}
    </button>
  )
}

export default SideBarIcon
