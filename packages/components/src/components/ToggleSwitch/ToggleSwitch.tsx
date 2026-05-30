import type { ComponentProps } from 'react'
import { html } from 'react-strict-dom'
import { styles } from './styles'

type HtmlDivProps = ComponentProps<typeof html.div>

export type ToggleSwitchProps = Omit<HtmlDivProps, 'children'> & {
  checked?: boolean
  onChange?: (checked: boolean) => void
  label?: string
  description?: string
  disabled?: boolean
  'aria-label'?: string
}

export function ToggleSwitch({
  checked = false,
  onChange,
  label,
  description,
  disabled = false,
  'aria-label': ariaLabel,
  ...rest
}: ToggleSwitchProps) {
  const handleToggle = () => {
    if (!disabled && onChange) onChange(!checked)
  }

  const hasDetails = Boolean(label) || Boolean(description)
  const railStateStyle = checked ? styles.railChecked : styles.railUnchecked
  const knobStateStyle = checked ? styles.knobChecked : styles.knobUnchecked

  return (
    <html.div {...rest} style={styles.root}>
      {hasDetails && (
        <html.div style={styles.details} onClick={disabled ? undefined : handleToggle}>
          {label && <html.span style={styles.label}>{label}</html.span>}
          {description && <html.span style={styles.description}>{description}</html.span>}
        </html.div>
      )}

      <html.button
        role='switch'
        aria-checked={checked}
        aria-disabled={disabled || undefined}
        aria-label={ariaLabel ?? label}
        disabled={disabled}
        onClick={handleToggle}
        style={[styles.rail, railStateStyle, disabled ? styles.railDisabled : null]}
      >
        <html.div style={[styles.knob, knobStateStyle]} />
      </html.button>
    </html.div>
  )
}
