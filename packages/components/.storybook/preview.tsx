import type { Preview } from '@storybook/react-vite'
import React from 'react'
import { css, html } from 'react-strict-dom'
import { ThemeProvider } from '../src/theme'
import { tokens } from '../src/theme/tokens.css'
import './react-strict-dom.css'

const styles = css.create({
  frame: {
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: tokens.colorSurfaceTertiary,
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  },
  content: {
    width: '100%',
    maxWidth: 1200
  }
})

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <html.div data-layoutconformance='strict' style={styles.frame}>
          <html.div style={styles.content}>
            <Story />
          </html.div>
        </html.div>
      </ThemeProvider>
    )
  ],
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export default preview
