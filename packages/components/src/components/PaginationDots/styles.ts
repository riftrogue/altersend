import { css } from 'react-strict-dom'
import { tokens } from '../../theme/tokens.css'

export const styles = css.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: tokens.space2
  },
  dot: {
    width: tokens.space15,
    height: tokens.space15,
    borderRadius: tokens.radiusFull,
    backgroundColor: tokens.colorBorderStrong,
    transitionDuration: '160ms',
    transitionProperty: 'width, background-color'
  },
  dotActive: {
    width: tokens.space6,
    backgroundColor: tokens.colorTextPrimary
  }
})
