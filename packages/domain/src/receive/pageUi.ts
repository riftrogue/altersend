import type { TransferRole } from '@altersend/domain'
import { formatFileSize } from '../format'

export type ReceiveStep =
  | 'join'
  | 'connecting'
  | 'incoming_transfer'
  | 'reconnecting'
  | 'interrupted'
  | 'completed'

export interface ReceivePageCopy {
  title: string
  description: string
}

export interface ReceiveConnectedPanelCopy {
  title: string
  description: string
}

interface ReceiveStepInput {
  hasIncomingFiles: boolean
  allDownloadsCompleted: boolean
  role: TransferRole | null
  peerCount: number
  isReconnecting?: boolean
}

export function getReceiveStep({
  hasIncomingFiles,
  allDownloadsCompleted,
  role,
  peerCount,
  isReconnecting = false
}: ReceiveStepInput): ReceiveStep {
  if (hasIncomingFiles && allDownloadsCompleted) {
    return 'completed'
  }

  if (role !== 'receiver') {
    return 'join'
  }

  if (hasIncomingFiles && isReconnecting) {
    return 'reconnecting'
  }

  if (hasIncomingFiles && peerCount === 0) {
    return 'interrupted'
  }

  if (hasIncomingFiles) {
    return 'incoming_transfer'
  }

  return 'connecting'
}

export function getReceivePageCopy(
  step: ReceiveStep,
  incomingCount: number,
  totalBytes = 0
): ReceivePageCopy {
  switch (step) {
    case 'join':
      return {
        title: 'Receive files',
        description: 'Enter a 64-character connection code from the sender to stream their files.'
      }
    case 'connecting':
      return {
        title: 'Connecting',
        description: 'Establishing a secure session with the sender.'
      }
    case 'incoming_transfer':
      return {
        title: 'Files available',
        description: `${incomingCount} ${incomingCount === 1 ? 'file' : 'files'} · ${formatFileSize(totalBytes)}`
      }
    case 'completed':
      return {
        title: incomingCount === 1 ? 'File received' : 'Files received',
        description: ''
      }
    case 'reconnecting':
      return {
        title: 'Reconnecting',
        description:
          'Reconnecting to the session. Files will be available again as soon as the link is restored.'
      }
    case 'interrupted':
      return {
        title: 'Transfer incomplete',
        description: 'The sender left before all files arrived.'
      }
    default: {
      const exhaustiveCheck: never = step
      return exhaustiveCheck
    }
  }
}

export function getConnectedPanelCopy(step: ReceiveStep): ReceiveConnectedPanelCopy | null {
  switch (step) {
    case 'incoming_transfer':
      return {
        title: 'Files ready',
        description: 'The sender has shared files. Review them and start each download when ready.'
      }
    case 'completed':
      return null
    case 'reconnecting':
    case 'interrupted':
      return null
    case 'join':
    case 'connecting':
      return null
    default: {
      const exhaustiveCheck: never = step
      return exhaustiveCheck
    }
  }
}

export function isConnectedStep(step: ReceiveStep): boolean {
  switch (step) {
    case 'incoming_transfer':
    case 'completed':
    case 'reconnecting':
    case 'interrupted':
      return true
    case 'join':
    case 'connecting':
      return false
    default: {
      const exhaustiveCheck: never = step
      return exhaustiveCheck
    }
  }
}
