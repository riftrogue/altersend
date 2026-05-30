import { useEffect, useState } from 'react'

const TICK_MS = 30

export function useSimulatedLoading(durationMs = 900): number {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const start = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - start
      const pct = Math.min(100, (elapsed / durationMs) * 100)
      setProgress(pct)
      if (pct >= 100) clearInterval(interval)
    }, TICK_MS)
    return () => clearInterval(interval)
  }, [durationMs])

  return progress
}
