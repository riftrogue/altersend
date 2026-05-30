let active = true
const listeners = new Set<(value: boolean) => void>()

export function setAppActive(value: boolean): void {
  if (active === value) return
  active = value
  listeners.forEach((l) => l(value))
}

export function getAppActive(): boolean {
  return active
}

export function subscribeAppActive(listener: (value: boolean) => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}
