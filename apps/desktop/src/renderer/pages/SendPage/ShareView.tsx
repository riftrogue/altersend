import { useEffect, useMemo, useState } from 'react'
import {
  formatFileSize,
  getPeerListEntries,
  senderKeepOpenHint,
  useTransferStore
} from '@altersend/domain'
import { Disclosure, PeerListCard, SendFileListRow } from '@altersend/components'
import { AlertCircleIcon, FolderIcon } from '@altersend/components/icons'
import { QRModal } from '../../components/QRModal'
import { ConnectionCard } from './ConnectionCard'

export function ShareView() {
  const selectedFiles = useTransferStore((s) => s.selectedFiles)
  const connectionState = useTransferStore((s) => s.connectionState)
  const topic = useTransferStore((s) => s.topic)
  const peerDownloads = useTransferStore((s) => s.peerDownloads)
  const connectedPeers = useTransferStore((s) => s.connectedPeers)
  const isPeerConnected = connectionState === 'peer-connected'
  const [isKeyCopied, setIsKeyCopied] = useState(false)
  const [isFilesExpanded, setIsFilesExpanded] = useState(false)
  const [isQRModalOpen, setIsQRModalOpen] = useState(false)

  const totalSize = selectedFiles.reduce((sum, file) => sum + (file.size ?? 0), 0)
  const peerEntries = useMemo(
    () => getPeerListEntries(connectedPeers, peerDownloads, selectedFiles),
    [connectedPeers, peerDownloads, selectedFiles]
  )
  const hasActivity = isPeerConnected || peerEntries.length > 0

  useEffect(() => {
    if (!isKeyCopied) return
    const timer = window.setTimeout(() => setIsKeyCopied(false), 2000)
    return () => window.clearTimeout(timer)
  }, [isKeyCopied])

  const copyTopic = async () => {
    if (!topic) return
    await navigator.clipboard.writeText(topic)
    setIsKeyCopied(true)
  }

  return (
    <div className='flex flex-col gap-3'>
      <aside aria-live='polite' className='flex items-center gap-2 px-1 text-text-muted'>
        <AlertCircleIcon size={12} />
        <span className='text-[11.5px] leading-[1.4]'>{senderKeepOpenHint}</span>
      </aside>

      <ConnectionCard
        topic={topic}
        hasActivity={hasActivity}
        isKeyCopied={isKeyCopied}
        onCopy={() => void copyTopic()}
        onOpenQR={() => setIsQRModalOpen(true)}
      />

      <PeerListCard entries={peerEntries} />

      <Disclosure
        compact
        expanded={isFilesExpanded}
        icon={<FolderIcon size={16} />}
        onToggle={() => setIsFilesExpanded((v) => !v)}
        subtitle={formatFileSize(totalSize)}
        title={selectedFiles.length === 1 ? '1 file' : `${selectedFiles.length} files`}
      >
        {selectedFiles.map((file) => (
          <SendFileListRow key={file.path} bare compact name={file.name} size={file.size} />
        ))}
      </Disclosure>

      <QRModal topic={topic} open={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} />
    </div>
  )
}
