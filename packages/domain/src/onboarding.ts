export type OnboardingSlideKind = 'pairing' | 'keep-open' | 'privacy'

export const privacyPolicyUrl = 'https://altersend.com/privacy'
export const termsOfServiceUrl = 'https://altersend.com/terms'
export const abuseEmail = 'abuse@altersend.com'
export const supportEmail = 'hello@altersend.com'
export const websiteUrl = 'https://altersend.com'
export const githubUrl = 'https://github.com/denislupookov/altersend'
export const discordUrl = 'https://discord.gg/R6tmrk85Vx'

export interface OnboardingSlideLink {
  label: string
  url: string
}

export interface OnboardingSlide {
  kind: OnboardingSlideKind
  title: string
  subtitle: string
  link?: OnboardingSlideLink
}

export const onboardingSlides: OnboardingSlide[] = [
  {
    kind: 'pairing',
    title: 'Files, directly between devices.',
    subtitle:
      'One device sends, the other receives. A short code connects them so files can stream directly.'
  },
  {
    kind: 'keep-open',
    title: 'Keep both apps open.',
    subtitle:
      'Files stream directly between devices — there is no cloud. Closing or backgrounding the app will cancel the transfer.'
  },
  {
    kind: 'privacy',
    title: 'End-to-end encrypted.',
    subtitle:
      'No servers, no copies, no middlemen. Your files travel peer-to-peer between you and the recipient.',
    link: { label: 'Read our privacy policy', url: privacyPolicyUrl }
  }
]

export const senderKeepOpenHint = 'Closing the app cancels the transfer.'
