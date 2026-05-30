import type { ComponentType } from 'react'

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export const ICON_SIZE_PX: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32
}

export interface IconProps {
  size?: IconSize | number
  color?: string
  label?: string
}

export type IconComponent = ComponentType<IconProps>
