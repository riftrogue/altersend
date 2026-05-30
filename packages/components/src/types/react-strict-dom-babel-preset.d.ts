declare module 'react-strict-dom/babel-preset' {
  import type { PluginItem } from '@babel/core'

  interface ReactStrictDomPresetResult {
    plugins: PluginItem[]
  }

  type ReactStrictDomPreset = (
    api: unknown,
    options?: Record<string, unknown>
  ) => ReactStrictDomPresetResult

  const preset: ReactStrictDomPreset

  export default preset
}
