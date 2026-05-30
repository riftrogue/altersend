import { formatFileSize } from '../format'
import type { ConnectedPeer, PeerDownloadEvent, PeerListStatus, PeerStatusData } from './shareModel'
import { derivePeerStatus } from './shareModel'

export interface PeerListEntry {
  peerKey: string
  shortKey: string
  status: PeerListStatus
  statusLabel: string
  detail: string | null
  progressPercent?: number
  sortKey: number
}

function getStatusLabel(data: PeerStatusData): string {
  switch (data.status) {
    case 'failed':
      return 'Failed'
    case 'downloaded':
      return 'Downloaded'
    case 'disconnected':
      return 'Disconnected'
    case 'online':
      return 'Online'
    case 'downloading':
      return data.progressPercent != null ? `Downloading ${data.progressPercent}%` : 'Downloading'
  }
}

function getStatusDetail(data: PeerStatusData): string | null {
  switch (data.status) {
    case 'failed':
      return data.failedFileName ?? null
    case 'downloaded':
      return `${data.completedCount} ${data.completedCount === 1 ? 'file' : 'files'}`
    case 'disconnected':
    case 'online':
      return data.completedCount > 0 ? `${data.completedCount} done` : null
    case 'downloading':
      if (data.transferredBytes != null && data.totalForDisplay != null) {
        return `${formatFileSize(data.transferredBytes)} / ${formatFileSize(data.totalForDisplay)}`
      }
      return data.inFlightFileName ?? null
  }
}

export function getPeerListEntries(
  connectedPeers: Record<string, ConnectedPeer>,
  peerDownloads: Record<string, PeerDownloadEvent>,
  offers: ReadonlyArray<{ readonly size?: number }>
): PeerListEntry[] {
  const byPeer = new Map<string, PeerDownloadEvent[]>()
  for (const event of Object.values(peerDownloads)) {
    const list = byPeer.get(event.peerKey) ?? []
    list.push(event)
    byPeer.set(event.peerKey, list)
  }

  const expectedFileCount = offers.length
  const expectedTotalBytes = offers.reduce((sum, offer) => sum + (offer.size ?? 0), 0)

  const peerKeys = new Set<string>([...Object.keys(connectedPeers), ...byPeer.keys()])

  const entries: PeerListEntry[] = []
  for (const peerKey of peerKeys) {
    const tracked = connectedPeers[peerKey]
    const isConnected = Boolean(tracked && !tracked.disconnectedAt)
    const events = byPeer.get(peerKey) ?? []
    const data = derivePeerStatus(isConnected, events, expectedFileCount, expectedTotalBytes)
    entries.push({
      peerKey,
      shortKey: peerKey.slice(0, 6),
      status: data.status,
      statusLabel: getStatusLabel(data),
      detail: getStatusDetail(data),
      progressPercent: data.progressPercent,
      sortKey: data.sortKey || tracked?.connectedAt || 0
    })
  }

  return entries.sort((a, b) => b.sortKey - a.sortKey)
}
