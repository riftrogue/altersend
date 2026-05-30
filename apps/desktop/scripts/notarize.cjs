#!/usr/bin/env node
const path = require('path')

const { notarize } = require('@electron/notarize')

exports.default = async function notarizeHook(context) {
  const { electronPlatformName, appOutDir, packager } = context
  if (electronPlatformName !== 'darwin') return
  if (process.env.SKIP_NOTARIZE === 'true') {
    console.log('Skipping notarization')
    return
  }
  const appName = packager.appInfo.productFilename
  const appPath = path.join(appOutDir, `${appName}.app`)

  if (process.env.APPLE_API_KEY_PATH && process.env.APPLE_API_KEY_ID && process.env.APPLE_API_ISSUER) {
    await notarize({
      appPath,
      tool: 'notarytool',
      appleApiKey: process.env.APPLE_API_KEY_PATH,
      appleApiKeyId: process.env.APPLE_API_KEY_ID,
      appleApiIssuer: process.env.APPLE_API_ISSUER,
    })
    return
  }

  if (!process.env.APPLE_ID || !process.env.APPLE_APP_SPECIFIC_PASSWORD || !process.env.APPLE_TEAM_ID) {
    console.log('Skipping notarization: no API key or Apple ID credentials set')
    return
  }

  await notarize({
    appPath,
    tool: 'notarytool',
    appleId: process.env.APPLE_ID,
    appleIdPassword: process.env.APPLE_APP_SPECIFIC_PASSWORD,
    teamId: process.env.APPLE_TEAM_ID,
  })
}
