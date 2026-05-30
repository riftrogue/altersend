import { html } from 'react-strict-dom'
import { AlertCircleIcon } from '../../icons'
import { styles } from './styles'

export interface KeepAppOpenHintProps {
  message: string
}

export function KeepAppOpenHint({ message }: KeepAppOpenHintProps) {
  return (
    <html.div aria-live='polite' style={styles.hint}>
      <AlertCircleIcon size={12} />
      <html.span style={styles.text}>{message}</html.span>
    </html.div>
  )
}
