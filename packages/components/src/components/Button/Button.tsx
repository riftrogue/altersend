import type { ReactNode } from 'react'
import { html } from 'react-strict-dom'
import { usePressState } from '../../hooks/usePressState'
import { styles } from './styles'

type ButtonElementProps = Parameters<typeof html.button>[0]

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'light'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends Omit<ButtonElementProps, 'children' | 'style'> {
  children: ReactNode
  icon?: ReactNode
  size?: ButtonSize
  variant?: ButtonVariant
  width?: 'auto' | 'full'
}

const pressedStyle = {
  primary: styles.primaryPressed,
  secondary: styles.secondaryPressed,
  ghost: styles.ghostPressed,
  light: styles.lightPressed
} as const

const textSize = {
  sm: styles.textSm,
  md: styles.textMd,
  lg: styles.textLg
} as const

const textVariant = {
  primary: styles.textPrimary,
  secondary: styles.textSecondary,
  ghost: styles.textGhost,
  light: styles.textLight
} as const

export function Button({
  children,
  disabled,
  icon,
  size = 'md',
  type = 'button',
  variant = 'primary',
  width = 'auto',
  ...props
}: ButtonProps) {
  const { isPressed, pressHandlers } = usePressState()
  const showPressed = isPressed && !disabled

  return (
    <html.button
      {...props}
      {...pressHandlers}
      disabled={disabled}
      type={type}
      style={[
        styles.base,
        styles[size],
        styles[variant],
        width === 'full' && styles.full,
        showPressed && pressedStyle[variant],
        disabled && styles.disabled
      ]}
    >
      {icon ?? null}
      {typeof children === 'string' ? (
        <html.span
          style={[
            styles.textBase,
            textSize[size],
            textVariant[variant],
            disabled && styles.textDisabled
          ]}
        >
          {children}
        </html.span>
      ) : (
        children
      )}
    </html.button>
  )
}
