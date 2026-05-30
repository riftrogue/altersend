import { Redirect } from 'expo-router'
import { isOnboardingCompleted } from '@/src/onboarding/onboardingStorage'

export default function Index() {
  const completed = isOnboardingCompleted()
  return <Redirect href={completed ? '/send' : '/onboarding'} />
}
