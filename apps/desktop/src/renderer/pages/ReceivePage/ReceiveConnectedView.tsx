import { useMemo } from 'react'
import { Button, SendFileListRow } from '@altersend/components'
import { DownloadIcon } from '@altersend/components/icons'
import { bridgeApi } from '../../api/bridgeApi'
import {
  clearSession,
  createDirectoryDownloadRequests,
  createSingleDownloadRequest,
  downloadFiles,
  getDownloadRowDisplay,
  getDownloadTotals,
  getOfferKey,
  useTransferStore
} from '@altersend/domain'

export function ReceiveConnectedView() {
  const incomingFileOffers = useTransferStore((s) => s.incomingFileOffers)
  const downloadStates = useTransferStore((s) => s.receiveDownloadStates)
  const peerCount = useTransferStore((s) => s.peerCount)

  const hasIncomingFiles = incomingFileOffers.length > 0
  const totals = useMemo(
    () => getDownloadTotals(incomingFileOffers, downloadStates),
    [downloadStates, incomingFileOffers]
  )

  const isDownloading = totals.activeCount > 0
  const allCompleted = hasIncomingFiles && totals.completedCount === incomingFileOffers.length

  const downloadAll = async () => {
    if (incomingFileOffers.length === 0 || isDownloading) return

    if (incomingFileOffers.length === 1) {
      const selected = await bridgeApi.pickSaveFile(incomingFileOffers[0].name)
      if (!selected?.path) return

      try {
        await downloadFiles([createSingleDownloadRequest(incomingFileOffers[0], selected.path)])
      } catch (error) {
        console.error('ReceiveConnectedView: single-file download failed', error)
      }
      return
    }

    const selectedDirectory = await bridgeApi.pickDirectory()
    if (!selectedDirectory?.path) return

    try {
      await downloadFiles(
        createDirectoryDownloadRequests(incomingFileOffers, selectedDirectory.path)
      )
    } catch (error) {
      console.error('ReceiveConnectedView: directory download failed', error)
    }
  }

  return (
    <div className='flex h-full min-h-0 w-full flex-1 flex-col'>
      <div className='min-h-0 flex-1 overflow-y-auto pr-1'>
        <div className='overflow-hidden rounded-[10px] border border-border-primary bg-background-subtle'>
          {incomingFileOffers.map((file) => {
            const row = getDownloadRowDisplay(file, downloadStates[getOfferKey(file)])
            return (
              <SendFileListRow
                key={getOfferKey(file)}
                bare
                compact
                name={file.name}
                size={file.size}
                description={row.description}
                status={row.status}
                progressPercent={row.progressPercent}
              />
            )
          })}
        </div>
      </div>

      <div className='mt-4 flex shrink-0 items-center justify-end gap-4'>
        <div className='flex shrink-0 items-center gap-2'>
          <Button onClick={clearSession} size='sm' variant='secondary'>
            End session
          </Button>
          {peerCount > 0 && hasIncomingFiles && !allCompleted ? (
            <Button
              disabled={isDownloading}
              icon={<DownloadIcon size={14} />}
              onClick={() => void downloadAll()}
              size='sm'
              variant='primary'
            >
              {isDownloading ? `Downloading ${totals.percent}%` : 'Download all'}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
