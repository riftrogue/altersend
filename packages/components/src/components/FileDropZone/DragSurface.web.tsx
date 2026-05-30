import type { ReactNode, DragEventHandler } from 'react'

// Raw <div> because react-strict-dom's html.div doesn't expose drag events.
export interface DragSurfaceProps {
  children: ReactNode
  onDragLeave?: DragEventHandler<HTMLDivElement>
  onDragOver?: DragEventHandler<HTMLDivElement>
  onDrop?: DragEventHandler<HTMLDivElement>
}

export function DragSurface({ children, onDragLeave, onDragOver, onDrop }: DragSurfaceProps) {
  return (
    <div onDragLeave={onDragLeave} onDragOver={onDragOver} onDrop={onDrop}>
      {children}
    </div>
  )
}
