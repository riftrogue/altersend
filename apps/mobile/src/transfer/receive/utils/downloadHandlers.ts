import * as MediaLibrary from 'expo-media-library'
import type { SaveDestination } from '@altersend/domain'

const IMAGE_EXTENSIONS = new Set([
  'jpg',
  'jpeg',
  'png',
  'gif',
  'heic',
  'heif',
  'webp',
  'bmp',
  'tiff',
  'tif'
])
const VIDEO_EXTENSIONS = new Set(['mov', 'mp4', 'm4v', '3gp', 'avi', 'mkv', 'webm'])

function getExtension(name: string): string {
  const dot = name.lastIndexOf('.')
  if (dot === -1 || dot === name.length - 1) return ''
  return name.slice(dot + 1).toLowerCase()
}

function isMediaFile(fileName: string): boolean {
  const ext = getExtension(fileName)
  return IMAGE_EXTENSIONS.has(ext) || VIDEO_EXTENSIONS.has(ext)
}

function toFilePath(uri: string): string {
  if (uri.startsWith('file://')) return uri
  return `file://${uri}`
}

export interface HandleDownloadedFileResult {
  intended: SaveDestination
  destination: SaveDestination
  localPath: string
}

export async function handleDownloadedFile(
  localPath: string,
  fileName: string
): Promise<HandleDownloadedFileResult> {
  if (!isMediaFile(fileName)) {
    return { intended: 'filesystem', destination: 'filesystem', localPath }
  }

  const permission = await MediaLibrary.requestPermissionsAsync(true)
  if (!permission.granted) {
    return { intended: 'photos', destination: 'filesystem', localPath }
  }
  await MediaLibrary.saveToLibraryAsync(toFilePath(localPath))
  return { intended: 'photos', destination: 'photos', localPath }
}
