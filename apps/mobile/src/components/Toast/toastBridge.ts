import type { ShowToastInput } from './ToastProvider'

type ToastPublisher = (input: ShowToastInput) => void

let publisher: ToastPublisher | null = null

export function setToastPublisher(next: ToastPublisher | null): void {
  publisher = next
}

export function pushToast(input: ShowToastInput): void {
  if (!publisher) return
  publisher(input)
}
