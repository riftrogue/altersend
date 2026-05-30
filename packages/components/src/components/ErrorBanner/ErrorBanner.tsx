import { html } from 'react-strict-dom'
import { styles } from './styles'

export interface ErrorBannerProps {
  message: string | null | undefined
}

export function ErrorBanner({ message }: ErrorBannerProps) {
  if (!message) return null
  return (
    <html.div style={styles.banner}>
      <html.p style={styles.message}>{message}</html.p>
    </html.div>
  )
}
