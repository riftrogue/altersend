import { css } from 'react-strict-dom'
import { tokens } from '../../theme/tokens.css'

export const styles = css.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    padding: tokens.space6,
    gap: tokens.space5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: tokens.colorBorderPrimary,
    borderRadius: tokens.radiusMd,
    backgroundColor: tokens.colorSurfacePrimary,
    boxShadow: 'none'
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    textAlign: 'left',
    gap: tokens.space15
  },
  title: {
    margin: 0,
    color: tokens.colorTextPrimary,
    fontFamily: tokens.fontFamilyDisplay,
    fontSize: tokens.fontSizeXl,
    fontWeight: tokens.fontWeightSemibold,
    letterSpacing: '-0.01em',
    lineHeight: tokens.lineHeightSnug
  },
  description: {
    margin: 0,
    color: tokens.colorTextSecondary,
    fontFamily: tokens.fontFamilySans,
    fontSize: tokens.fontSizeBase,
    fontWeight: tokens.fontWeightRegular,
    lineHeight: tokens.lineHeightRelaxed
  },
  content: {
    display: 'flex',
    flexDirection: 'column'
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
})
