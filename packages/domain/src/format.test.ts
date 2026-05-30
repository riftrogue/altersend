import { describe, expect, it } from 'vitest'
import { formatFileSize } from './format'

describe('formatFileSize', () => {
  it('formats bytes when under 1 KB', () => {
    expect(formatFileSize(0)).toBe('0 B')
    expect(formatFileSize(512)).toBe('512 B')
  })

  it('formats kilobytes with one decimal', () => {
    expect(formatFileSize(1024)).toBe('1.0 KB')
    expect(formatFileSize(1536)).toBe('1.5 KB')
  })

  it('formats megabytes with one decimal', () => {
    expect(formatFileSize(1024 * 1024)).toBe('1.0 MB')
    expect(formatFileSize(2.5 * 1024 * 1024)).toBe('2.5 MB')
  })

  it('formats gigabytes with one decimal', () => {
    expect(formatFileSize(1024 ** 3)).toBe('1.0 GB')
  })
})
