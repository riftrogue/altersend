export const inlineFlexDisplay = 'flex'

export const singleLineText = {} as const

export const truncateText = {
  overflow: 'hidden'
} as const

export function focusVisible(_style: Record<string, unknown>) {
  return {}
}

export function paddingInsets(top: number, right = top, bottom = top, left = right) {
  return {
    paddingTop: top,
    paddingRight: right,
    paddingBottom: bottom,
    paddingLeft: left
  }
}

export function marginInsets(top: number, right = top, bottom = top, left = right) {
  return {
    marginTop: top,
    marginRight: right,
    marginBottom: bottom,
    marginLeft: left
  }
}
