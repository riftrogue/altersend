export type IconButtonIcon = 'settings' | 'back' | 'close'

export type IconButtonSize = 'medium' | 'large'

export interface IconButtonProps {
  icon: IconButtonIcon
  label: string
  onPress: () => void
  size?: IconButtonSize
}

export const ICON_BUTTON_SIZES: Record<IconButtonSize, number> = {
  medium: 32,
  large: 44
}
