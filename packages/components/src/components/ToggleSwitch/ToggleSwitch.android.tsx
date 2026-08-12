import { Host, Switch as ComposeSwitch } from '@expo/ui/jetpack-compose'
import { StyleSheet } from 'react-native'
import { useTheme } from '../../theme'
import { ToggleSwitchRow } from './ToggleSwitchRow'
import type { ToggleSwitchProps } from './types'

export function ToggleSwitch({
  checked = false,
  onChange,
  label,
  description,
  disabled = false,
  'aria-label': ariaLabel
}: ToggleSwitchProps) {
  const { theme } = useTheme()
  const c = theme.colors

  const handleToggle = () => {
    if (!disabled && onChange) onChange(!checked)
  }

  return (
    <ToggleSwitchRow
      label={label}
      description={description}
      disabled={disabled}
      accessibilityLabel={ariaLabel ?? label}
      onToggle={handleToggle}
    >
      <Host style={styles.host}>
        <ComposeSwitch
          value={checked}
          enabled={!disabled}
          onCheckedChange={onChange}
          colors={{
            checkedTrackColor: c.colorSuccess,
            checkedThumbColor: c.colorBackground,
            checkedBorderColor: c.colorSuccess,
            checkedIconColor: c.colorSuccess,
            uncheckedTrackColor: c.colorBackgroundSubtle,
            uncheckedThumbColor: c.colorBorderStrong,
            uncheckedBorderColor: c.colorBorderStrong,
            uncheckedIconColor: c.colorBackgroundSubtle
          }}
        />
      </Host>
    </ToggleSwitchRow>
  )
}

const styles = StyleSheet.create({
  host: { width: 52, height: 32 }
})
