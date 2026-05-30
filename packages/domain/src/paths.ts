export function getParentDir(filePath: string): string {
  const lastSlash = Math.max(filePath.lastIndexOf('/'), filePath.lastIndexOf('\\'))
  return lastSlash > 0 ? filePath.slice(0, lastSlash) : filePath
}

export function shortenHomePath(p: string): string {
  const home = p.match(/^\/Users\/[^/]+/)?.[0]
  return home ? p.replace(home, '~') : p
}
