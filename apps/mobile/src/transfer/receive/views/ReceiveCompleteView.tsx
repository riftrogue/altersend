import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SendFileListRow, useTheme, withAlpha } from '@altersend/components'
import { CheckIcon } from '@altersend/components/icons'
import { formatFileSize, getOfferKey, useTransferStore } from '@altersend/domain'
import { OpenAction, getFileMeta } from '../utils/fileRowUtils'
import { openCompletedFile } from '../utils/openCompletedFile'

export function ReceiveCompleteView() {
  const incomingFileOffers = useTransferStore((s) => s.incomingFileOffers)
  const downloadStates = useTransferStore((s) => s.receiveDownloadStates)
  const onOpenFile = openCompletedFile
  const { theme } = useTheme()

  const totalBytes = incomingFileOffers.reduce((sum, f) => sum + f.size, 0)
  const fileCount = incomingFileOffers.length

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.successCard,
          {
            borderColor: withAlpha(theme.colors.colorSuccess, 0.22),
            backgroundColor: withAlpha(theme.colors.colorSuccess, 0.08)
          }
        ]}
      >
        <View
          style={[
            styles.checkBadge,
            { backgroundColor: withAlpha(theme.colors.colorSuccess, 0.2) }
          ]}
        >
          <CheckIcon size={16} color={theme.colors.colorSuccess} />
        </View>
        <View style={styles.successText}>
          <Text style={[styles.successTitle, { color: theme.colors.colorSuccess }]}>
            {fileCount} {fileCount === 1 ? 'file' : 'files'} received
          </Text>
          <Text style={[styles.successSubtitle, { color: theme.colors.colorTextMuted }]}>
            {formatFileSize(totalBytes)} · saved
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.card,
          {
            borderColor: theme.colors.colorBorderPrimary,
            backgroundColor: theme.colors.colorBackgroundSubtle
          }
        ]}
      >
        {incomingFileOffers.map((file, index) => {
          const offerKey = getOfferKey(file)
          const state = downloadStates[offerKey]
          const isComplete = state?.status === 'completed'
          return (
            <SendFileListRow
              key={file.id}
              bare
              isFirst={index === 0}
              name={file.name}
              description={getFileMeta(file.size, state)}
              trailing={
                isComplete ? (
                  <OpenAction fileName={file.name} offerKey={offerKey} onPress={onOpenFile} />
                ) : undefined
              }
            />
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 12
  },
  successCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderRadius: 14,
    borderWidth: 1,
    padding: 16
  },
  checkBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  successText: {
    flex: 1,
    minWidth: 0
  },
  successTitle: {
    fontSize: 15,
    fontWeight: '700'
  },
  successSubtitle: {
    fontSize: 13,
    marginTop: 2
  },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden'
  }
})
