import { StyleSheet, Text, TextInput, View } from 'react-native'
import Constants from 'expo-constants'
import { useState } from 'react'
import { Button, FeedbackTypeSelector, useTheme } from '@altersend/components'
import { SendIcon } from '@altersend/components/icons'
import type { FeedbackType } from '@altersend/components'
import { Layout } from '@/src/components'

type State = 'idle' | 'sending' | 'sent' | 'error'

const PLACEHOLDERS: Record<FeedbackType, string> = {
  'Bug report': 'Describe what happened and how to reproduce it…',
  'Feature request': 'What would you like to see in AlterSend?',
  General: 'Share your thoughts…'
}

async function postToDiscord(type: FeedbackType, message: string, version: string): Promise<void> {
  const url = process.env.EXPO_PUBLIC_DISCORD_WEBHOOK_URL
  if (!url || url.includes('PLACEHOLDER')) throw new Error('Webhook not configured')
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      embeds: [
        {
          title: type,
          description: message,
          color: 0x5865f2,
          fields: [
            { name: 'Version', value: `v${version}`, inline: true },
            { name: 'Platform', value: 'Mobile', inline: true }
          ],
          timestamp: new Date().toISOString()
        }
      ]
    })
  })
}

export default function ReportScreen() {
  const { theme } = useTheme()
  const [type, setType] = useState<FeedbackType>('Bug report')
  const [message, setMessage] = useState('')
  const [state, setState] = useState<State>('idle')
  const version = Constants.expoConfig?.version ?? '0.0.0'

  const send = async () => {
    setState('sending')
    try {
      await postToDiscord(type, message.trim(), version)
      setState('sent')
    } catch {
      setState('error')
    }
  }

  const canSend = message.trim().length > 0 && state === 'idle'

  if (state === 'sent') {
    return (
      <Layout title='Feedback' description='' hasNativeHeader>
        <View style={styles.centred}>
          <Text style={[styles.sentTitle, { color: theme.colors.colorTextPrimary }]}>Thanks!</Text>
          <Text style={[styles.sentHint, { color: theme.colors.colorTextMuted }]}>
            Your feedback has been received.
          </Text>
        </View>
      </Layout>
    )
  }

  return (
    <Layout title='Feedback' description='' hasNativeHeader>
      <View style={styles.content}>
        <FeedbackTypeSelector value={type} onChange={setType} disabled={state === 'sending'} />

        <TextInput
          style={[
            styles.input,
            {
              color: theme.colors.colorTextPrimary,
              backgroundColor: theme.colors.colorBackgroundSubtle,
              borderColor:
                state === 'error' ? theme.colors.colorDanger : theme.colors.colorBorderPrimary
            }
          ]}
          placeholder={PLACEHOLDERS[type]}
          placeholderTextColor={theme.colors.colorTextMuted}
          multiline
          textAlignVertical='top'
          value={message}
          onChangeText={(t) => {
            setMessage(t)
            if (state === 'error') setState('idle')
          }}
          editable={state !== 'sending'}
        />

        {state === 'error' && (
          <Text style={[styles.error, { color: theme.colors.colorDanger }]}>
            Failed to send. Check your connection and try again.
          </Text>
        )}

        <Button
          variant='primary'
          size='lg'
          width='full'
          disabled={!canSend}
          onClick={() => void send()}
          icon={
            <SendIcon
              size={16}
              color={canSend ? theme.colors.colorBackground : theme.colors.colorTextMuted}
            />
          }
        >
          {state === 'sending' ? 'Sending…' : 'Send feedback'}
        </Button>
      </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
  content: { gap: 12 },
  input: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
    fontSize: 14,
    minHeight: 140
  },
  error: { fontSize: 12 },
  centred: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  sentTitle: { fontSize: 18, fontWeight: '700' },
  sentHint: { fontSize: 14, textAlign: 'center' }
})
