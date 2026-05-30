import type { RendererTransferEvent } from '@altersend/core'
import type { SendDraftPhase } from './pageUi'
import type { BrowserFileLike, SelectedFile, SenderUploadItem } from './draftTypes'

export interface SharingStatusEvent extends Extract<RendererTransferEvent, { type: 'status' }> {
  state: 'sharing'
  file?: string
  path?: string
}

export function getPhaseFromSelection(fileCount: number): SendDraftPhase {
  return fileCount > 0 ? 'selected' : 'empty'
}

export function mergeSelectedFiles(
  current: SelectedFile[],
  nextSelectedFiles: SelectedFile[]
): SelectedFile[] {
  const merged = new Map(current.map((file) => [file.path, file]))
  for (const file of nextSelectedFiles) merged.set(file.path, file)
  return Array.from(merged.values())
}

export function normalizeSelectedFiles(
  filesOrData: Array<File | BrowserFileLike>,
  getPathForFile: (file: File) => string
): SelectedFile[] {
  return filesOrData.flatMap((fileOrData) => {
    if ('path' in fileOrData && fileOrData.path) {
      return [{ name: fileOrData.name, path: fileOrData.path, size: fileOrData.size }]
    }

    if (fileOrData instanceof File) {
      const filePath = getPathForFile(fileOrData)
      if (!filePath) return []
      return [{ name: fileOrData.name, path: filePath, size: fileOrData.size }]
    }

    return []
  })
}

export function createInitialUploadItems(selectedFiles: SelectedFile[]): SenderUploadItem[] {
  return selectedFiles.map((file) => ({
    ...file,
    status: 'waiting' as const
  }))
}

export function applySharingProgress(
  current: SenderUploadItem[],
  message: SharingStatusEvent
): SenderUploadItem[] {
  if (current.length === 0) return current

  const activePath = typeof message.path === 'string' ? message.path : undefined

  const targetIndex = activePath
    ? current.findIndex((item) => item.path === activePath)
    : current.findIndex((item) => item.name === message.file && item.status !== 'completed')

  if (targetIndex === -1) return current

  return current.map((item, index) => {
    if (index < targetIndex) {
      return item.status === 'completed' ? item : { ...item, status: 'completed' }
    }

    if (index === targetIndex) {
      return item.status === 'uploading' ? item : { ...item, status: 'uploading' }
    }

    return item.status === 'completed' ? item : { ...item, status: 'waiting' }
  })
}
