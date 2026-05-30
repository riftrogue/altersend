import type { OnboardingSlideKind } from '@altersend/domain'
import type { SvgProps } from 'react-native-svg'
import PairingSvg from '../../../../assets/onboarding.svg'
import KeepOpenSvg from '../../../../assets/phone_connected.svg'
import EncryptedSvg from '../../../../assets/encrypted.svg'

const ILLUSTRATIONS: Record<OnboardingSlideKind, React.FC<SvgProps>> = {
  pairing: PairingSvg,
  'keep-open': KeepOpenSvg,
  privacy: EncryptedSvg
}

export function OnboardingIllustration({
  kind,
  height = 180
}: {
  kind: OnboardingSlideKind
  height?: number
}) {
  const Svg = ILLUSTRATIONS[kind]
  return <Svg height={height} />
}
