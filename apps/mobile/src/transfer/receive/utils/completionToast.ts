import { Linking, Platform } from 'react-native'
import type { SaveDestination } from '@altersend/domain'
import type { ShowToastInput } from '@/src/components/Toast'

interface BuildCompletionToastInput {
  destinations: SaveDestination[]
}

function openPhotos() {
  const url = Platform.OS === 'ios' ? 'photos-redirect://' : 'content://media/internal/images/media'
  void Linking.openURL(url).catch(() => {})
}

function openFiles() {
  if (Platform.OS === 'ios') {
    void Linking.openURL('shareddocuments://').catch(() => {})
  }
}

const LONG_DURATION_MS = 6000

export function buildCompletionToast({
  destinations
}: BuildCompletionToastInput): ShowToastInput | null {
  const count = destinations.length
  if (count === 0) return null

  const photosCount = destinations.filter((d) => d === 'photos').length
  const filesystemCount = destinations.filter((d) => d === 'filesystem').length

  if (photosCount > 0 && filesystemCount > 0) {
    return {
      title: `${count} files saved`,
      hint: Platform.OS === 'ios' ? 'Photos + AlterSend folder' : undefined,
      actionLabel: Platform.OS === 'android' ? 'View Photos' : undefined,
      onPress: openPhotos,
      durationMs: LONG_DURATION_MS
    }
  }

  if (photosCount > 0) {
    return {
      title: count === 1 ? 'Saved to Photos' : `${count} saved to Photos`,
      hint: Platform.OS === 'ios' ? 'Tap to view' : undefined,
      actionLabel: Platform.OS === 'android' ? 'View' : undefined,
      onPress: openPhotos,
      durationMs: LONG_DURATION_MS
    }
  }

  return {
    title: count === 1 ? 'Saved in Files' : `${count} saved in Files`,
    hint: Platform.OS === 'ios' ? 'AlterSend folder' : undefined,
    actionLabel: Platform.OS === 'android' ? 'Open' : undefined,
    onPress: Platform.OS === 'ios' ? openFiles : undefined,
    durationMs: LONG_DURATION_MS
  }
}
