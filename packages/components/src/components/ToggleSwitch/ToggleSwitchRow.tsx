import type { ReactNode } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../../theme'

export interface ToggleSwitchRowProps {
  label?: string
  description?: string
  disabled: boolean
  accessibilityLabel?: string
  onToggle: () => void
  children: ReactNode
}

export function ToggleSwitchRow({
  label,
  description,
  disabled,
  accessibilityLabel,
  onToggle,
  children
}: ToggleSwitchRowProps) {
  const { theme } = useTheme()
  const c = theme.colors
  const hasDetails = Boolean(label) || Boolean(description)

  return (
    <View
      style={[styles.root, disabled ? styles.disabled : null]}
      accessibilityLabel={accessibilityLabel}
    >
      {hasDetails ? (
        <Pressable style={styles.details} onPress={onToggle} disabled={disabled}>
          {label ? (
            <Text style={[styles.label, { color: c.colorTextPrimary }]}>{label}</Text>
          ) : null}
          {description ? (
            <Text style={[styles.description, { color: c.colorTextMuted }]}>{description}</Text>
          ) : null}
        </Pressable>
      ) : null}
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    gap: 12
  },
  disabled: { opacity: 0.5 },
  details: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 4
  },
  label: { fontSize: 14, fontWeight: '500', lineHeight: 20 },
  description: { fontSize: 12, lineHeight: 17 }
})
