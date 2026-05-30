export type SendStep = 'selecting' | 'preparing' | 'waiting_for_receiver' | 'receiver_connected'

export type SendDraftPhase = 'empty' | 'selected' | 'preparing' | 'ready'

export interface SendPageCopy {
  title: string
  description: string
}

export interface SendShareStatus {
  label: string
  tone: 'muted' | 'success'
}

export function getSendPageCopy(step: SendStep): SendPageCopy {
  switch (step) {
    case 'selecting':
      return {
        title: 'Send files',
        description:
          'Choose one or more files and generate a one-time code for a direct encrypted transfer.'
      }
    case 'preparing':
      return {
        title: 'Preparing transfer',
        description: 'Preparing the selected files before the share code is revealed.'
      }
    case 'waiting_for_receiver':
    case 'receiver_connected':
      return {
        title: 'Share the code',
        description: 'Send the code or QR to your recipient to start the transfer.'
      }
    default: {
      const exhaustiveCheck: never = step
      return exhaustiveCheck
    }
  }
}

export function getSendShareStatus(step: SendStep): SendShareStatus | null {
  switch (step) {
    case 'selecting':
    case 'preparing':
      return null
    case 'waiting_for_receiver':
      return {
        label: 'Waiting for peer',
        tone: 'muted'
      }
    case 'receiver_connected':
      return {
        label: 'Peer connected',
        tone: 'success'
      }
    default: {
      const exhaustiveCheck: never = step
      return exhaustiveCheck
    }
  }
}

export function isShareStep(step: SendStep): boolean {
  switch (step) {
    case 'selecting':
    case 'preparing':
      return false
    case 'waiting_for_receiver':
    case 'receiver_connected':
      return true
    default: {
      const exhaustiveCheck: never = step
      return exhaustiveCheck
    }
  }
}

export function getSendStep({
  draftPhase,
  isPeerConnected
}: {
  draftPhase: SendDraftPhase
  isPeerConnected: boolean
}): SendStep {
  if (draftPhase === 'empty' || draftPhase === 'selected') return 'selecting'
  if (draftPhase === 'preparing') return 'preparing'
  if (!isPeerConnected) return 'waiting_for_receiver'
  return 'receiver_connected'
}
