import type { ReactNode } from 'react'
import { html } from 'react-strict-dom'
import { styles } from './styles'

type DivElementProps = Parameters<typeof html.div>[0]
type HeadingElementProps = Parameters<typeof html.h3>[0]
type ParagraphElementProps = Parameters<typeof html.p>[0]

export interface CardProps extends Omit<DivElementProps, 'style'> {
  children: ReactNode
}

export interface CardSectionProps extends Omit<DivElementProps, 'style'> {
  children: ReactNode
}

export interface CardTitleProps extends Omit<HeadingElementProps, 'style'> {
  children: ReactNode
}

export interface CardDescriptionProps extends Omit<ParagraphElementProps, 'style'> {
  children: ReactNode
}

export function Card({ children, ...props }: CardProps) {
  return (
    <html.div {...props} style={styles.root}>
      {children}
    </html.div>
  )
}

export function CardHeader({ children, ...props }: CardSectionProps) {
  return (
    <html.div {...props} style={styles.header}>
      {children}
    </html.div>
  )
}

export function CardTitle({ children, ...props }: CardTitleProps) {
  return (
    <html.h3 {...props} style={styles.title}>
      {children}
    </html.h3>
  )
}

export function CardDescription({ children, ...props }: CardDescriptionProps) {
  return (
    <html.p {...props} style={styles.description}>
      {children}
    </html.p>
  )
}

export function CardContent({ children, ...props }: CardSectionProps) {
  return (
    <html.div {...props} style={styles.content}>
      {children}
    </html.div>
  )
}

export function CardFooter({ children, ...props }: CardSectionProps) {
  return (
    <html.div {...props} style={styles.footer}>
      {children}
    </html.div>
  )
}
