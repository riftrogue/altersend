import { css } from 'react-strict-dom'
import { tokens } from '../../theme/tokens.css'

export const styles = css.create({
  row: {
    paddingBlock: tokens.space3,
    paddingInline: tokens.space4
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: tokens.colorBorderPrimary
  },
  rowContent: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: tokens.space3
  },
  iconBox: {
    width: tokens.space8,
    height: tokens.space8,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: tokens.colorBorderPrimary,
    borderRadius: tokens.radiusSm,
    backgroundColor: tokens.colorSurfaceSecondary,
    color: tokens.colorTextSecondary
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    flex: 1
  },
  metaRow: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: tokens.space3
  },
  nameBlock: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    flex: 1
  },
  name: {
    margin: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: tokens.colorTextPrimary,
    fontFamily: tokens.fontFamilySans,
    fontSize: tokens.fontSizeBase,
    fontWeight: tokens.fontWeightMedium,
    lineHeight: tokens.lineHeightNormal
  },
  size: {
    margin: 0,
    marginTop: tokens.space05,
    color: tokens.colorTextSecondary,
    fontFamily: tokens.fontFamilyMono,
    fontSize: tokens.fontSizeXs,
    lineHeight: tokens.lineHeightNormal
  },
  status: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.space2,
    flexShrink: 0,
    paddingTop: tokens.space05,
    color: tokens.colorTextSecondary,
    fontFamily: tokens.fontFamilySans,
    fontSize: tokens.fontSizeSm,
    lineHeight: tokens.lineHeightNormal
  },
  statusLabel: {
    margin: 0,
    color: 'inherit',
    fontFamily: tokens.fontFamilySans,
    fontSize: tokens.fontSizeSm,
    lineHeight: tokens.lineHeightNormal
  },
  statusDot: {
    width: tokens.space15,
    height: tokens.space15,
    borderRadius: tokens.radiusFull,
    flexShrink: 0
  },
  statusMuted: {
    backgroundColor: tokens.colorTextMuted
  },
  statusActive: {
    backgroundColor: tokens.colorTextPrimary
  },
  statusSuccess: {
    backgroundColor: tokens.colorSuccess
  },
  progressTrack: {
    marginTop: tokens.space2,
    height: tokens.space1,
    overflow: 'hidden',
    borderRadius: tokens.radiusFull,
    backgroundColor: tokens.colorSurfaceSecondary
  },
  progressBar: {
    height: '100%',
    borderRadius: tokens.radiusFull,
    transitionDuration: '300ms',
    transitionProperty: 'width',
    transitionTimingFunction: 'ease-out'
  },
  progressWaiting: {
    width: '0%',
    backgroundColor: tokens.colorBorderPrimary
  },
  progressUploading: {
    width: '66.6667%',
    backgroundColor: tokens.colorTextPrimary
  },
  progressCompleted: {
    width: '100%',
    backgroundColor: tokens.colorSuccess
  }
})
