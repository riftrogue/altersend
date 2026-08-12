import type { ReactNode } from 'react'
import { html } from 'react-strict-dom'
import { ChevronRightIcon } from '../../icons'
import { usePressState } from '../../hooks/usePressState'
import { useTheme } from '../../theme'
import { styles } from './styles'

const ROW_PADDING = 16
const ICON_GAP = 14
const DEFAULT_ICON_SIZE = 20

const toneLabelStyle = {
  default: null,
  danger: styles.labelDanger
} as const

export interface MenuItemProps {
  icon?: ReactNode
  iconSize?: number
  label: string
  labelFontFamily?: string
  subtitle?: string
  value?: string
  trailing?: ReactNode
  chevron?: boolean
  tone?: 'default' | 'danger'
  onPress?: () => void
  isLast?: boolean
  disabled?: boolean
}

export function MenuItem({
  icon,
  iconSize = DEFAULT_ICON_SIZE,
  label,
  labelFontFamily,
  subtitle,
  value,
  trailing,
  chevron = true,
  tone = 'default',
  onPress,
  isLast = false,
  disabled = false
}: MenuItemProps) {
  const { theme } = useTheme()
  const { isPressed, pressHandlers } = usePressState()
  const interactive = !!onPress && !disabled

  const renderTrailing = (): ReactNode => {
    if (trailing !== undefined) return trailing
    if (interactive && chevron)
      return <ChevronRightIcon size={16} color={theme.colors.colorTextMuted} />
    return null
  }

  const trailingContent = renderTrailing()

  return (
    <>
      <html.div
        {...(interactive ? pressHandlers : {})}
        aria-disabled={disabled || undefined}
        onClick={disabled ? undefined : onPress}
        role={interactive ? 'button' : undefined}
        style={[
          styles.item,
          interactive && styles.itemPressable,
          interactive &&
            isPressed &&
            ({ backgroundColor: theme.colors.colorSurfacePrimary } as never)
        ]}
        tabIndex={interactive ? 0 : undefined}
      >
        {icon ? (
          <html.div style={[styles.iconSlot, styles.iconSlotSize(iconSize)]}>{icon}</html.div>
        ) : null}
        <html.div style={styles.text}>
          <html.p
            style={[
              styles.label,
              toneLabelStyle[tone],
              disabled && styles.labelDisabled,
              labelFontFamily ? ({ fontFamily: labelFontFamily } as never) : null
            ]}
          >
            {label}
          </html.p>
          {subtitle ? <html.p style={styles.subtitle}>{subtitle}</html.p> : null}
        </html.div>
        {value || trailingContent ? (
          <html.div style={styles.trailing}>
            {value ? <html.p style={styles.value}>{value}</html.p> : null}
            {trailingContent}
          </html.div>
        ) : null}
      </html.div>
      {isLast ? null : (
        <html.div
          style={[
            styles.divider,
            styles.dividerInset(icon ? ROW_PADDING + iconSize + ICON_GAP : ROW_PADDING)
          ]}
        />
      )}
    </>
  )
}
