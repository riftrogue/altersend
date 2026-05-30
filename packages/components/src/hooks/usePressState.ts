import { useState } from 'react'

export function usePressState() {
  const [isPressed, setIsPressed] = useState(false)
  const press = () => setIsPressed(true)
  const release = () => setIsPressed(false)

  return {
    isPressed,
    pressHandlers: {
      onPointerDown: press,
      onPointerUp: release,
      onPointerCancel: release,
      onPointerLeave: release,
      onTouchStart: press,
      onTouchEnd: release,
      onTouchCancel: release
    }
  }
}
