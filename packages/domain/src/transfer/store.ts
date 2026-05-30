import { create } from 'zustand'
import { initialTransferSessionState, transferSessionReducer } from './reducer'
import type { TransferAction, TransferSessionState } from './types'

export const transferStore = create<TransferSessionState>()(() => initialTransferSessionState)

export const useTransferStore = transferStore

export function dispatchToTransferStore(action: TransferAction): void {
  transferStore.setState((current) => transferSessionReducer(current, action))
}
