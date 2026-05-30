import { css } from 'react-strict-dom'
import { tokens } from '../../theme/tokens.css'

export const styles = css.create({
  hint: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.space2,
    paddingLeft: tokens.space1,
    paddingRight: tokens.space1
  },
  text: {
    margin: 0,
    fontSize: tokens.fontSizeXs,
    lineHeight: tokens.lineHeightNormal,
    color: tokens.colorTextMuted,
    flexShrink: 1
  }
})
