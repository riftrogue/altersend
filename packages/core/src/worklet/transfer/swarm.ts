import b4a from 'b4a'
import crypto from 'hypercore-crypto'
import Hyperswarm, { type PeerInfo, type PeerSocket } from 'hyperswarm'
import { PeerControlChannel } from './control-channel'
import type { PeerControlMessage } from './control-channel'
import { PeerIdentityStore, type NoiseKeyPair } from './peer-identity-store'

export interface PeerSession {
  socket: PeerSocket
  peerKey: string
  controlChannel: PeerControlChannel
}

export interface TransferSwarmCallbacks {
  onReady: () => Promise<void>
  onReplicate: (socket: PeerSocket) => void
  onPeerConnected: (session: PeerSession) => void
  onPeerDisconnected: (peerKey: string | null, remainingCount: number) => void
  onControlMessage: (message: PeerControlMessage, session: PeerSession) => void
}

export interface TransferSwarmOptions {
  identityStore?: PeerIdentityStore
}

/**
 * TransferSwarm manages Hyperswarm connectivity.
 *
 * Responsibilities:
 *   - Joining / leaving discovery topics
 *   - Tracking active peer sessions
 *   - Creating per-socket Protomux control channels
 *   - Broadcasting control messages to all connected peers
 *
 */
export class TransferSwarm {
  private swarm: Hyperswarm
  private readonly peerSessions: Map<PeerSocket, PeerSession>
  private readonly callbacks: TransferSwarmCallbacks
  private readonly identityStore: PeerIdentityStore | null
  private readonly joinedDiscoveries: Set<string>
  private readonly pendingPeerKeys: Set<string>
  private hostedTopicHex: string | null

  constructor(callbacks: TransferSwarmCallbacks, options: TransferSwarmOptions = {}) {
    this.identityStore = options.identityStore ?? null
    this.swarm = this.createSwarm()
    this.peerSessions = new Map()
    this.callbacks = callbacks
    this.joinedDiscoveries = new Set()
    this.pendingPeerKeys = new Set()
    this.hostedTopicHex = null
  }

  private createSwarm(keyPair?: NoiseKeyPair): Hyperswarm {
    const opts = { firewall: () => false }
    const swarm = keyPair ? new Hyperswarm({ ...opts, keyPair }) : new Hyperswarm(opts)
    swarm.on('connection', (socket, info) => {
      void this.handleConnection(socket, info).catch((err) => {
        console.error(
          'TransferSwarm: handleConnection failed',
          err instanceof Error ? err.message : String(err)
        )
        try {
          socket.destroy()
        } catch {}
      })
    })
    return swarm
  }

  private async handleConnection(socket: PeerSocket, info: PeerInfo): Promise<void> {
    if (this.joinedDiscoveries.size === 0) {
      try {
        socket.destroy()
      } catch {}
      return
    }

    const peerKey = b4a.toString(info.publicKey, 'hex')
    const isDuplicate =
      this.pendingPeerKeys.has(peerKey) ||
      Array.from(this.peerSessions.values()).some((s) => s.peerKey === peerKey)
    if (isDuplicate) {
      try {
        socket.destroy()
      } catch {}
      return
    }
    this.pendingPeerKeys.add(peerKey)

    try {
      await this.callbacks.onReady()

      if (this.joinedDiscoveries.size === 0) {
        try {
          socket.destroy()
        } catch {}
        return
      }

      this.callbacks.onReplicate(socket)

      let session: PeerSession | null = null
      const controlChannel = PeerControlChannel.create(socket, (message) => {
        if (!session) return
        this.callbacks.onControlMessage(message, session)
      })
      if (!controlChannel) {
        try {
          socket.destroy()
        } catch {}
        return
      }

      session = { socket, peerKey, controlChannel }
      this.peerSessions.set(socket, session)
      this.callbacks.onPeerConnected(session)

      socket.on('close', () => this.cleanupPeer(socket))
      socket.on('error', () => this.cleanupPeer(socket))
    } finally {
      this.pendingPeerKeys.delete(peerKey)
    }
  }

  private cleanupPeer(socket: PeerSocket): void {
    const session = this.peerSessions.get(socket)
    if (!session) return
    this.peerSessions.delete(socket)
    this.callbacks.onPeerDisconnected(session.peerKey, this.peerSessions.size)
  }

  private async joinTopic(topic: Uint8Array): Promise<void> {
    const discovery = crypto.discoveryKey(topic)
    const discoveryHex = b4a.toString(discovery, 'hex')
    this.joinedDiscoveries.add(discoveryHex)
    const session = this.swarm.join(discovery, { server: true, client: true })
    await session.flushed()
  }

  async endSession(): Promise<void> {
    this.joinedDiscoveries.clear()
    this.hostedTopicHex = null
    this.pendingPeerKeys.clear()

    const sessionsToClose = Array.from(this.peerSessions.values())
    this.peerSessions.clear()
    for (const session of sessionsToClose) {
      try {
        session.socket.destroy()
      } catch {}
    }

    const oldSwarm = this.swarm
    this.swarm = this.createSwarm()

    try {
      await oldSwarm.destroy()
    } catch (err) {
      console.warn('TransferSwarm: old swarm destroy failed', err)
    }
  }

  async join(topicHex: string): Promise<void> {
    if (this.identityStore && this.joinedDiscoveries.size === 0) {
      await this.swapKeyPair(await this.identityStore.getOrCreate(topicHex))
    }
    const topic = b4a.from(topicHex, 'hex')
    await this.joinTopic(topic)
  }

  private async swapKeyPair(keyPair: NoiseKeyPair): Promise<void> {
    const oldSwarm = this.swarm
    this.swarm = this.createSwarm(keyPair)
    try {
      await oldSwarm.destroy()
    } catch (err) {
      console.warn('TransferSwarm: keypair swap — old swarm destroy failed', err)
    }
  }

  async generateKey(): Promise<string> {
    if (this.hostedTopicHex) {
      return this.hostedTopicHex
    }
    const topic = crypto.randomBytes(32)
    const topicHex = b4a.toString(topic, 'hex')
    await this.joinTopic(topic)
    this.hostedTopicHex = topicHex
    return topicHex
  }

  broadcast(message: PeerControlMessage): void {
    for (const session of this.peerSessions.values()) {
      session.controlChannel.send(message)
    }
  }

  get peerCount(): number {
    return this.peerSessions.size
  }

  hasConnectedPeers(): boolean {
    return this.peerSessions.size > 0
  }

  async destroy(): Promise<void> {
    await this.swarm.destroy()
  }
}
