import * as Sentry from '@sentry/electron/main'
import { SENTRY_DSN } from './sentry-dsn.gen.js'

let reportingEnabled = false

export function initSentry(): void {
  Sentry.init({
    dsn: SENTRY_DSN || undefined,
    beforeSend(event) {
      return reportingEnabled ? event : null
    }
  })
}

export function setReportingEnabled(enabled: boolean): void {
  reportingEnabled = enabled
}
