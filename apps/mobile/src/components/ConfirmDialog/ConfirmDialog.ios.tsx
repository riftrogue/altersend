import { StyleSheet } from 'react-native'
import { Alert, Button, Host, Spacer, Text } from '@expo/ui/swift-ui'
import { frame } from '@expo/ui/swift-ui/modifiers'
import type { ConfirmDialogProps } from './ConfirmDialog.types'

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  cancelLabel,
  destructive = false,
  onConfirm,
  onCancel
}: ConfirmDialogProps) {
  return (
    <Host style={styles.host} pointerEvents='box-none'>
      <Alert
        title={title}
        isPresented={open}
        onIsPresentedChange={(presented) => {
          if (!presented && open) onCancel()
        }}
      >
        <Alert.Trigger>
          <Spacer modifiers={[frame({ width: 0, height: 0 })]} />
        </Alert.Trigger>
        {message ? (
          <Alert.Message>
            <Text>{message}</Text>
          </Alert.Message>
        ) : null}
        <Alert.Actions>
          <Button label={cancelLabel} role='cancel' onPress={onCancel} />
          <Button
            label={confirmLabel}
            role={destructive ? 'destructive' : 'default'}
            onPress={onConfirm}
          />
        </Alert.Actions>
      </Alert>
    </Host>
  )
}

const styles = StyleSheet.create({
  host: { width: 0, height: 0 }
})
