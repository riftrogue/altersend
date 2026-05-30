type AbortListener = () => void

class PolyfilledAbortSignal {
  aborted = false
  private readonly listeners = new Set<AbortListener>()

  addEventListener(_event: 'abort', listener: AbortListener): void {
    if (this.aborted) {
      listener()
      return
    }
    this.listeners.add(listener)
  }

  removeEventListener(_event: 'abort', listener: AbortListener): void {
    this.listeners.delete(listener)
  }

  _abort(): void {
    if (this.aborted) return
    this.aborted = true
    for (const listener of this.listeners) {
      try {
        listener()
      } catch (err) {
        console.warn('AbortSignal: listener threw', err)
      }
    }
    this.listeners.clear()
  }
}

class PolyfilledAbortController {
  readonly signal: PolyfilledAbortSignal = new PolyfilledAbortSignal()
  abort(): void {
    this.signal._abort()
  }
}

const g = globalThis as unknown as { AbortController?: unknown; AbortSignal?: unknown }
if (typeof g.AbortController === 'undefined') {
  g.AbortController = PolyfilledAbortController
  g.AbortSignal = PolyfilledAbortSignal
}
