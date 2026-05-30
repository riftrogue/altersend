#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const dsn = process.env.SENTRY_DSN ?? ''
const out = path.join(__dirname, '../src/electron/sentry-dsn.gen.ts')
fs.writeFileSync(out, `export const SENTRY_DSN = '${dsn}';\n`)
