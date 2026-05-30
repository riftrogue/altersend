export type FileTypeColor = { fg: string; bg: string }

export const fileTypeColors = {
  image: { fg: '#60a5fa', bg: 'rgba(59, 130, 246, 0.14)' },
  video: { fg: '#fb7185', bg: 'rgba(244, 63, 94, 0.14)' },
  pdf: { fg: '#f87171', bg: 'rgba(239, 68, 68, 0.14)' },
  audio: { fg: '#c084fc', bg: 'rgba(168, 85, 247, 0.14)' },
  archive: { fg: '#facc15', bg: 'rgba(234, 179, 8, 0.14)' },
  app: { fg: '#f3efe8', bg: 'rgba(243, 239, 232, 0.10)' },
  code: { fg: '#5eead4', bg: 'rgba(20, 184, 166, 0.14)' },
  generic: { fg: '#cbd5e1', bg: 'rgba(148, 163, 184, 0.12)' }
} as const satisfies Record<string, FileTypeColor>

export type FileTypeKey = keyof typeof fileTypeColors
