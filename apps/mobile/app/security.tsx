import { StyleSheet, View } from 'react-native'
import { useState } from 'react'
import { ToggleSwitch, useTheme } from '@altersend/components'
import { useTranslation } from '@altersend/locales'
import { Layout } from '@/src/components'
import {
  isCrashReportingEnabled,
  setCrashReportingEnabled
} from '@/src/lifecycle/crashReportingStorage'
import { closeSentry, initSentry } from '@/src/sentry'

export default function SecurityScreen() {
  const { t } = useTranslation(['settings'])
  const { theme } = useTheme()
  const [crashReporting, setCrashReporting] = useState(isCrashReportingEnabled)

  const handleCrashReportingToggle = (value: boolean) => {
    setCrashReporting(value)
    setCrashReportingEnabled(value)
    if (value) initSentry()
    else closeSentry()
  }

  const cardStyle = {
    backgroundColor: theme.colors.colorBackgroundSubtle,
    borderColor: theme.colors.colorBorderPrimary
  }

  return (
    <Layout title={t('settings:rows.security')} description='' hasNativeHeader>
      <View style={[styles.card, styles.cardPad, cardStyle]}>
        <ToggleSwitch
          checked={crashReporting}
          onChange={handleCrashReportingToggle}
          label={t('settings:crashReports.label')}
          description={t('settings:crashReports.description')}
        />
      </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden'
  },
  cardPad: {
    paddingHorizontal: 16,
    paddingVertical: 13
  }
})
