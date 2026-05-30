import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { getFileKind, useTheme } from '@altersend/components'
import { formatFileSize, type DownloadItemState } from '@altersend/domain'

function getActionLabel(name: string): string {
  const kind = getFileKind(name)
  if (kind === 'image') return 'View'
  if (kind === 'video') return 'Play'
  return 'Open'
}

function getDestinationLabel(state: DownloadItemState | undefined): string {
  if (!state || state.destination === undefined) return ''
  if (state.destination === 'photos') return 'Photos'
  return 'Files › Downloads'
}

export function getFileMeta(
  size: number,
  state: DownloadItemState | undefined,
  options?: { disabled?: boolean }
): string {
  if (options?.disabled) return "Didn't arrive"
  const destination = getDestinationLabel(state)
  return destination ? `${destination} · ${formatFileSize(size)}` : formatFileSize(size)
}

interface OpenActionProps {
  fileName: string
  offerKey: string
  onPress: (offerKey: string) => void
}

export function OpenAction({ fileName, offerKey, onPress }: OpenActionProps) {
  const { theme } = useTheme()
  return (
    <Pressable
      onPress={() => onPress(offerKey)}
      style={({ pressed }) => [
        actionStyles.button,
        {
          borderColor: theme.colors.colorBorderPrimary,
          backgroundColor: pressed ? theme.colors.colorSurfaceSecondary : 'transparent'
        }
      ]}
    >
      <Text style={[actionStyles.label, { color: theme.colors.colorTextSecondary }]}>
        {getActionLabel(fileName)}
      </Text>
    </Pressable>
  )
}

const actionStyles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexShrink: 0
  },
  label: {
    fontSize: 13,
    fontWeight: '500'
  }
})
