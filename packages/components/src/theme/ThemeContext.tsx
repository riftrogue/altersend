import { createContext, useContext, useState, type ReactNode } from 'react'
import { css, html } from 'react-strict-dom'
import { darkTheme } from './themes/dark'
import { lightTheme } from './themes/light'
import { darkThemeStyle } from './themes/dark.css'
import { lightThemeStyle } from './themes/light.css'
import type { Theme } from './types'
import { ThemeType } from './types'

type HtmlDivStyle = NonNullable<Parameters<typeof html.div>[0]['style']>

function getTheme(type: ThemeType): Theme {
  switch (type) {
    case ThemeType.Light:
      return lightTheme
    case ThemeType.Dark:
    default:
      return darkTheme
  }
}

function getThemeStyle(type: ThemeType): HtmlDivStyle {
  switch (type) {
    case ThemeType.Light:
      return [lightThemeStyle] as unknown as HtmlDivStyle
    case ThemeType.Dark:
    default:
      return [darkThemeStyle] as unknown as HtmlDivStyle
  }
}

interface ThemeContextValue {
  theme: Theme
  themeType: ThemeType
  setTheme: (theme: ThemeType) => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: darkTheme,
  themeType: ThemeType.Dark,
  setTheme: () => {}
})

interface ThemeProviderProps {
  theme?: ThemeType
  children: ReactNode
}

const styles = css.create({
  root: {
    minHeight: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  }
})

export function ThemeProvider({
  theme: initialTheme = ThemeType.Dark,
  children
}: ThemeProviderProps) {
  const [themeType, setThemeType] = useState<ThemeType>(initialTheme)
  const themeStyle = getThemeStyle(themeType)

  return (
    <ThemeContext.Provider
      value={{
        theme: getTheme(themeType),
        themeType,
        setTheme: setThemeType
      }}
    >
      <html.div data-theme={themeType} style={themeStyle}>
        <html.div style={styles.root}>{children}</html.div>
      </html.div>
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext)
}
