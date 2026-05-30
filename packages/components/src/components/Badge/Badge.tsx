import type { ReactNode } from 'react'
import { html } from 'react-strict-dom'
import { styles } from './styles'

type SpanElementProps = Parameters<typeof html.span>[0]

export interface BadgeProps extends Omit<SpanElementProps, 'children' | 'style'> {
  children: ReactNode
  dot?: boolean
  tone?: 'neutral' | 'accent' | 'success' | 'danger'
}

export function Badge({ children, dot = false, tone = 'neutral', ...props }: BadgeProps) {
  return (
    <html.span {...props} style={[styles.root, styles[tone]]}>
      {dot ? <html.span aria-hidden={true} style={styles.dot} /> : null}
      <html.span style={styles.label}>{children}</html.span>
    </html.span>
  )
}
