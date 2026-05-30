import { html } from 'react-strict-dom'
import { styles } from './styles'

export interface PaginationDotsProps {
  count: number
  activeIndex: number
}

export function PaginationDots({ count, activeIndex }: PaginationDotsProps) {
  return (
    <html.div style={styles.row} aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <html.span key={i} style={[styles.dot, i === activeIndex && styles.dotActive]} />
      ))}
    </html.div>
  )
}
