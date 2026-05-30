import { app } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'
import { initSentry } from './sentry.js'

initSentry()
import { registerIpcHandlers } from './ipc.js'
import { createDesktopRuntime } from './runtime.js'
import { createMainWindow, sendToAllWindows } from './window.js'

if (!app.isPackaged && process.platform === 'darwin' && app.dock) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  app.dock.setIcon(path.join(__dirname, '..', '..', 'build', 'icon.png'))
}

const runtime = createDesktopRuntime({ broadcast: sendToAllWindows })

registerIpcHandlers(runtime)
app.setAsDefaultProtocolClient(runtime.metadata.protocol)

const lock = runtime.allowMultipleInstances ? true : app.requestSingleInstanceLock()

if (!lock) {
  app.quit()
} else {
  app.on('open-url', (evt, url) => {
    evt.preventDefault()
    runtime.forwardDeepLink(url)
  })

  app.on('second-instance', (_evt, args) => {
    const url = args.find((arg) => arg.startsWith(runtime.metadata.protocol + '://'))
    if (url) runtime.forwardDeepLink(url)
  })

  app.whenReady().then(() => {
    createMainWindow(runtime.getPear()).catch((err) => {
      console.error('Failed to create window:', err)
      app.quit()
    })
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
}
