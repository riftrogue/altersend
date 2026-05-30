import { useEffect, useRef, useState } from 'react'
import { transferStore } from '../transfer/store'
import type { PeerEvent } from './shareModel'

export function usePeerEventLog(): PeerEvent[] {
  const peerCount = transferStore((s) => s.peerCount)
  const [events, setEvents] = useState<PeerEvent[]>([])
  const prevPeerCountRef = useRef(0)
  const idRef = useRef(0)

  useEffect(() => {
    const prev = prevPeerCountRef.current
    prevPeerCountRef.current = peerCount
    if (peerCount === prev) return

    const type: PeerEvent['type'] = peerCount > prev ? 'connected' : 'disconnected'
    const id = String(++idRef.current)
    setEvents((current) => [...current, { id, type, timestamp: Date.now() }])
  }, [peerCount])

  return events
}
