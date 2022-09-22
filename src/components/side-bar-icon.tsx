import Link from 'next/link'
import { MouseEventHandler } from 'react'

type SideBarIconProps = {
  active?: boolean
  icon: any
  to: string | MouseEventHandler<HTMLButtonElement>
  tooltip?: string
}

const SideBarIcon = ({
  active = false,
  icon,
  to,
  tooltip
}: SideBarIconProps) => {
  if (typeof to === 'string') {
    return (
      <Link href={to} passHref>
        <button
          className={`sidebar-icon group p-2 ${active ? 'active' : null}`}
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
    <button className={`sidebar-icon group p-2`} onClick={to}>
      {icon}
      {!!tooltip && (
        <span className="sidebar-tooltip group-hover:scale-100">{tooltip}</span>
      )}
    </button>
  )
}

export default SideBarIcon
