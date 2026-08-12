import { Host, Toggle } from '@expo/ui/swift-ui'
import { disabled as disabledModifier, labelsHidden, tint } from '@expo/ui/swift-ui/modifiers'
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
        <Toggle
          isOn={checked}
          onIsOnChange={onChange}
          modifiers={[labelsHidden(), tint(theme.colors.colorSuccess), disabledModifier(disabled)]}
        />
      </Host>
    </ToggleSwitchRow>
  )
}

const styles = StyleSheet.create({
  host: { width: 51, height: 31 }
})
