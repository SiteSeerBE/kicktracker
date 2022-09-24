import classNames from 'classnames'
import { MouseEventHandler } from 'react'

type SideBarIconProps = {
  icon: any
  active?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  tooltip?: string
}

const SideBarIcon = ({
  icon,
  active = false,
  onClick,
  tooltip
}: SideBarIconProps) => {
  return (
    <button
      className={classNames('sidebar-icon group p-2', { active: active })}
      onClick={onClick}
    >
      {icon}
      {!!tooltip && (
        <span className="sidebar-tooltip group-hover:scale-100">{tooltip}</span>
      )}
    </button>
  )
}

export default SideBarIcon
