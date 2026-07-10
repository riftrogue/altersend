import { StyleSheet, View } from 'react-native'
import { useTheme, withAlpha } from '@altersend/components'
import { AlertCircleIcon } from '@altersend/components/icons'
import { Text } from '@/src/components/ThemedText'

interface ErrorPanelProps {
  title: string
  message: string
}

export function ErrorPanel({ title, message }: ErrorPanelProps) {
  const { theme } = useTheme()
  const c = theme.colors
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: withAlpha(c.colorDanger, 0.12),
          borderColor: withAlpha(c.colorDanger, 0.24)
        }
      ]}
    >
      <View style={[styles.iconBox, { backgroundColor: withAlpha(c.colorDanger, 0.18) }]}>
        <AlertCircleIcon size={20} color={c.colorDanger} />
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { color: c.colorDanger }]}>{title}</Text>
        <Text style={[styles.text, { color: c.colorDanger }]}>{message}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderRadius: 12,
    borderWidth: 1,
    padding: 16
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    flex: 1,
    gap: 2
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
    letterSpacing: -0.2
  },
  text: {
    fontSize: 13,
    lineHeight: 18
  }
})
