import { Linking, Platform } from 'react-native'
import * as Sharing from 'expo-sharing'
import { transferStore } from '@altersend/domain'

function openPhotos(): void {
  const url = Platform.OS === 'ios' ? 'photos-redirect://' : 'content://media/internal/images/media'
  void Linking.openURL(url).catch(() => {})
}

export function openCompletedFile(offerKey: string): void {
  const item = transferStore.getState().receiveDownloadStates[offerKey]
  if (!item || item.status !== 'completed' || !item.savedTo) return

  if (item.destination === 'photos') {
    openPhotos()
    return
  }

  const uri = item.savedTo.startsWith('file://') ? item.savedTo : `file://${item.savedTo}`
  void Sharing.isAvailableAsync()
    .then((available) => {
      if (!available) return
      return Sharing.shareAsync(uri)
    })
    .catch((err) => console.error('openCompletedFile: shareAsync failed', err))
}
