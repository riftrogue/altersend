export type TransferStatus =
  | 'peer-connected'
  | 'peer-disconnected'
  | 'sharing'
  | 'downloading'
  | 'download-progress'
  | 'downloaded'
  | 'download-failed'
  | 'peer-download-started'
  | 'peer-download-progress'
  | 'peer-downloaded'
  | 'peer-download-failed'
  | 'joining'
  | 'joined'
  | 'disconnected'
  | 'reconnecting'

export type TransferRole = 'sender' | 'receiver'

export interface ReadyEvent {
  type: 'ready'
}

interface TopicEvent {
  type: 'topic'
  key: string
}

export interface StatusEvent {
  type: 'status'
  state: TransferStatus
  peer?: string
  peers?: number
  file?: string
  path?: string
  savedTo?: string
  transferId?: string
  fileId?: string
  totalBytes?: number
  bytesTransferred?: number
  message?: string
}

export interface RoleEvent {
  type: 'role'
  role: TransferRole | null
}

export interface ErrorEvent {
  type: 'error'
  message: string
}

export type TransferIPCMessage = ReadyEvent | TopicEvent | StatusEvent | RoleEvent | ErrorEvent

export function createReadyEvent(): ReadyEvent {
  return { type: 'ready' }
}

export function createStatusEvent(
  state: TransferStatus,
  extra: Partial<StatusEvent> = {}
): StatusEvent {
  return {
    type: 'status',
    state,
    ...extra
  }
}

export function createRoleEvent(role: TransferRole | null): RoleEvent {
  return { type: 'role', role }
}

export function createErrorEvent(message: string): ErrorEvent {
  return {
    type: 'error',
    message
  }
}
