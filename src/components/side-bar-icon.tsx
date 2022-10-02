import classNames from 'classnames'
import { MouseEventHandler } from 'react'

type SideBarIconProps = {
  active?: boolean
  icon: any
  onClick?: MouseEventHandler<HTMLButtonElement>
  tooltip: string
  hideTooltip?: boolean
}

const SideBarIcon = (props: SideBarIconProps) => {
  return (
    <button
      className={classNames('sidebar-icon group p-2', { active: props.active })}
      onClick={props.onClick}
    >
      {props.icon}
      <span
        className={classNames(
          'sidebar-tooltip delay transition-opacity delay-[1500ms] group-hover:scale-100 group-hover:opacity-0',
          {
            'md:hidden': props.hideTooltip
          }
        )}
      >
        {props.tooltip}
      </span>
    </button>
  )
}

export default SideBarIcon
