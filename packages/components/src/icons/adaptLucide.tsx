import type { ComponentType } from 'react'
import type { IconComponent, IconProps } from './types'
import { ICON_SIZE_PX } from './types'
import { useIconColor } from './useIconColor'

type LucideLike = ComponentType<{
  size?: number | string
  color?: string
  [key: string]: unknown
}>

export function adaptLucide(Icon: LucideLike): IconComponent {
  return function AdaptedIcon({ size = 'md', color, label }: IconProps) {
    const px = typeof size === 'number' ? size : ICON_SIZE_PX[size]
    const resolvedColor = useIconColor(color)
    const a11yProps = label ? { 'aria-label': label, role: 'img' as const } : undefined
    return <Icon size={px} color={resolvedColor} {...a11yProps} />
  }
}
