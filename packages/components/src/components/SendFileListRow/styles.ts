import { css } from 'react-strict-dom'
import { tokens } from '../../theme/tokens.css'

export const styles = css.create({
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.space3,
    paddingTop: tokens.space3,
    paddingBottom: tokens.space3,
    paddingLeft: tokens.space35,
    paddingRight: tokens.space3,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: tokens.colorBorderPrimary,
    borderRadius: tokens.radiusLg,
    backgroundColor: tokens.colorBackgroundSubtle,
    transitionDuration: '160ms',
    transitionProperty: 'background-color, border-color',
    ':hover': {
      backgroundColor: tokens.colorSurfacePrimary,
      borderColor: tokens.colorBorderStrong
    }
  },
  rowCompact: {
    gap: tokens.space25,
    paddingTop: tokens.space2,
    paddingBottom: tokens.space2,
    paddingLeft: tokens.space25,
    paddingRight: tokens.space2,
    borderRadius: tokens.radiusMd
  },
  rowBare: {
    borderWidth: 0,
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: tokens.colorBorderPrimary,
    borderRadius: 0,
    backgroundColor: 'transparent',
    ':hover': {
      backgroundColor: tokens.colorBackgroundSubtle,
      borderTopColor: tokens.colorBorderPrimary
    }
  },
  rowBareFirst: {
    borderTopWidth: 0
  },
  thumb: {
    width: tokens.space10,
    height: tokens.space10,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: tokens.radiusSm
  },
  thumbCompact: {
    width: 30,
    height: 30,
    borderRadius: tokens.radiusXs
  },
  thumbImage: { backgroundColor: 'rgba(59, 130, 246, 0.14)', color: '#60a5fa' },
  thumbVideo: { backgroundColor: 'rgba(244, 63, 94, 0.14)', color: '#fb7185' },
  thumbPdf: { backgroundColor: 'rgba(239, 68, 68, 0.14)', color: '#f87171' },
  thumbAudio: { backgroundColor: 'rgba(168, 85, 247, 0.14)', color: '#c084fc' },
  thumbArchive: { backgroundColor: 'rgba(234, 179, 8, 0.14)', color: '#facc15' },
  thumbApp: { backgroundColor: 'rgba(243, 239, 232, 0.10)', color: '#f3efe8' },
  thumbCode: { backgroundColor: 'rgba(20, 184, 166, 0.14)', color: '#5eead4' },
  thumbGeneric: { backgroundColor: 'rgba(148, 163, 184, 0.12)', color: '#cbd5e1' },
  thumbDisabled: {
    backgroundColor: tokens.colorBackgroundSubtle,
    color: tokens.colorTextMuted
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    flex: 1,
    gap: tokens.space05
  },
  metaRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: tokens.space3
  },
  nameBlock: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    flex: 1,
    gap: tokens.space05
  },
  statusGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.space15,
    flexShrink: 0
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
  statusLabel: {
    margin: 0,
    color: tokens.colorTextSecondary,
    fontFamily: tokens.fontFamilySans,
    fontSize: tokens.fontSizeSm,
    lineHeight: tokens.lineHeightNormal
  },
  progressTrack: {
    marginTop: tokens.space15,
    height: tokens.space1,
    overflow: 'hidden',
    borderRadius: tokens.radiusFull,
    backgroundColor: tokens.colorBorderPrimary
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
  },
  progressDynamic: (percent: number) => ({
    width: `${percent}%`,
    backgroundColor: tokens.colorTextPrimary
  }),
  name: {
    margin: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: tokens.colorTextPrimary,
    fontFamily: tokens.fontFamilySans,
    fontSize: tokens.fontSizeBase,
    fontWeight: tokens.fontWeightMedium,
    lineHeight: tokens.lineHeightSnug
  },
  nameCompact: {
    fontSize: tokens.fontSizeMd
  },
  nameDisabled: {
    color: tokens.colorTextMuted
  },
  size: {
    margin: 0,
    color: tokens.colorTextMuted,
    fontFamily: tokens.fontFamilySans,
    fontSize: tokens.fontSizeSm,
    lineHeight: tokens.lineHeightNormal
  },
  sizeCompact: {
    fontSize: tokens.fontSizeXs
  },
  removeButton: {
    flexShrink: 0,
    width: tokens.space8,
    height: tokens.space8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    borderStyle: 'solid',
    borderRadius: tokens.radiusSm,
    backgroundColor: 'transparent',
    padding: 0,
    color: tokens.colorTextMuted,
    cursor: 'pointer',
    transitionDuration: '150ms',
    transitionProperty: 'color, background-color',
    transitionTimingFunction: 'ease',
    ':hover': {
      color: tokens.colorTextPrimary,
      backgroundColor: tokens.colorSurfacePrimary
    }
  },
  removeButtonCompact: {
    width: 26,
    height: 26,
    borderRadius: tokens.radiusXs
  }
})
