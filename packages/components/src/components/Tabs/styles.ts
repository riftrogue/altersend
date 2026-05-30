import { css } from 'react-strict-dom'
import { tokens } from '../../theme/tokens.css'

export const styles = css.create({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: tokens.space4,
    minHeight: 0,
    minWidth: 0,
    width: '100%'
  },
  list: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.space1,
    alignSelf: 'flex-start',
    padding: tokens.space1,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: tokens.colorBorderPrimary,
    borderRadius: tokens.radiusMd,
    backgroundColor: tokens.colorBackgroundSubtle,
    boxShadow: `inset 0 1px 0 ${tokens.colorBorderPrimary}`
  },
  trigger: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 88,
    height: tokens.space10,
    paddingBlock: 0,
    paddingInline: tokens.space4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'transparent',
    borderRadius: tokens.radiusSm,
    backgroundColor: 'transparent',
    color: tokens.colorTextSecondary,
    fontFamily: tokens.fontFamilySans,
    fontSize: tokens.fontSizeBase,
    fontWeight: tokens.fontWeightSemibold,
    cursor: 'pointer',
    transitionDuration: '160ms',
    transitionProperty: 'color, border-color, background-color, box-shadow',
    ':hover': {
      color: tokens.colorTextPrimary,
      backgroundColor: tokens.colorSurfacePrimary
    },
    ':focus-visible': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${tokens.colorFocusRing}`
    }
  },
  triggerActive: {
    backgroundColor: tokens.colorSurfacePrimary,
    borderColor: tokens.colorBorderStrong,
    boxShadow: `0 1px 2px ${tokens.colorShadow}`,
    color: tokens.colorTextPrimary
  },
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    minHeight: 0,
    minWidth: 0,
    outline: 'none'
  }
})
