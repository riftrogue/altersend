import { useCallback, useEffect, useRef } from 'react'
import { View } from 'react-native'
import { Button } from '@altersend/components'
import { Layout } from '@/src/components'
import { SelectFilesView } from '@/src/transfer/send'
import { useRouter } from 'expo-router'
import { getSendPageCopy, getSendStep, isShareStep, useTransferStore } from '@altersend/domain'
import { clearSenderFlow, continueShare } from '@altersend/domain'

type FlowTarget = 'select' | 'preparing' | 'share'

function NavigationController() {
  const router = useRouter()
  const connectionState = useTransferStore((s) => s.connectionState)
  const draftPhase = useTransferStore((s) => s.draftPhase)
  const step = getSendStep({ draftPhase, isPeerConnected: connectionState === 'peer-connected' })
  const prevTarget = useRef<FlowTarget>('select')

  useEffect(() => {
    const target: FlowTarget =
      step === 'preparing' ? 'preparing' : isShareStep(step) ? 'share' : 'select'

    if (prevTarget.current === target) return

    const prev = prevTarget.current
    prevTarget.current = target

    if (target === 'preparing') {
      router.push('/send/preparing')
    } else if (target === 'share') {
      if (prev === 'preparing') {
        router.replace('/send/share')
      } else {
        router.push('/send/share')
      }
    } else if (prev !== 'select') {
      clearSenderFlow()
      if (router.canDismiss()) router.dismissAll()
    }
  }, [step, router])

  return null
}

export default function SendSelectScreen() {
  const selectedFiles = useTransferStore((s) => s.selectedFiles)
  const draftPhase = useTransferStore((s) => s.draftPhase)
  const connectionState = useTransferStore((s) => s.connectionState)
  const router = useRouter()

  const step = getSendStep({ draftPhase, isPeerConnected: connectionState === 'peer-connected' })
  const copy = getSendPageCopy(step)
  const hasSelectedFiles = selectedFiles.length > 0

  const openMenu = useCallback(() => router.push('/settings'), [router])

  return (
    <View style={{ flex: 1 }}>
      <NavigationController />
      <Layout
        title={copy.title}
        description={copy.description}
        onMenuPress={openMenu}
        footer={
          hasSelectedFiles ? (
            <Button
              onClick={() => void continueShare(selectedFiles)}
              size='lg'
              variant='primary'
              width='full'
            >
              {`Send ${selectedFiles.length} file${selectedFiles.length === 1 ? '' : 's'}`}
            </Button>
          ) : undefined
        }
      >
        <SelectFilesView />
      </Layout>
    </View>
  )
}
