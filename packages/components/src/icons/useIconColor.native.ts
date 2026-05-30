import { useTheme } from '../theme'

// RN can't resolve `currentColor`, so fall back to the theme's text color.
export function useIconColor(color: string | undefined): string {
  const { theme } = useTheme()
  if (!color || color === 'currentColor') {
    return theme.colors.colorTextSecondary
  }
  return color
}
