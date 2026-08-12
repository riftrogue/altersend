import type { ReactNode } from 'react'
import { html } from 'react-strict-dom'
import { styles } from './styles'

export interface MenuGroupProps {
  title?: string
  children: ReactNode
}

export function MenuGroup({ title, children }: MenuGroupProps) {
  return (
    <html.div style={styles.group}>
      {title ? <html.p style={styles.heading}>{title}</html.p> : null}
      <html.div style={styles.card}>{children}</html.div>
    </html.div>
  )
}
