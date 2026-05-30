import type { StorybookConfig } from '@storybook/react-vite'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [getAbsolutePath('@storybook/addon-a11y'), getAbsolutePath('@storybook/addon-docs')],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {}
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript'
  },
  async viteFinal(config) {
    const { mergeConfig } = await import('vite')
    const babel = await import('@babel/core')
    const { default: styleXPlugin } = await import('@stylexjs/babel-plugin')
    const { default: rsdPreset } = await import('react-strict-dom/babel-preset')
    const { default: react } = await import('@vitejs/plugin-react')

    const styleXOptions = {
      dev: true,
      debug: false,
      importSources: [{ from: 'react-strict-dom', as: 'css' }],
      runtimeInjection: true,
      styleResolution: 'property-specificity' as const,
      unstable_moduleResolution: {
        rootDir: process.cwd(),
        themeFileExtension: '.css',
        type: 'commonJS' as const
      }
    }

    const reactWithRsd = react({
      babel: {
        configFile: false,
        babelrc: false,
        presets: [['@babel/preset-react', { runtime: 'automatic' }]],
        plugins: [
          rsdPreset(null, { debug: false, platform: 'web' }).plugins[0],
          [styleXPlugin, styleXOptions]
        ]
      }
    })

    const rsdRuntimePlugin = {
      name: 'react-strict-dom-runtime-transform',
      enforce: 'pre' as const,
      async transform(code: string, id: string) {
        if (!id.includes('react-strict-dom') || !id.includes('runtime')) {
          return null
        }

        if (!code.includes('stylex.create') && !code.includes('css.create')) {
          return null
        }

        try {
          const result = await babel.transformAsync(code, {
            filename: id,
            plugins: [
              [
                styleXPlugin,
                {
                  ...styleXOptions,
                  importSources: ['@stylexjs/stylex']
                }
              ]
            ],
            configFile: false,
            babelrc: false,
            sourceMaps: true
          })

          if (result?.code) {
            return { code: result.code, map: result.map }
          }
        } catch (error) {
          console.error('[RSD] Failed to compile react-strict-dom/runtime:', error)
        }

        return null
      }
    }

    return mergeConfig(config, {
      plugins: [rsdRuntimePlugin, ...(Array.isArray(reactWithRsd) ? reactWithRsd : [reactWithRsd])],
      resolve: {
        extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.tsx', '.ts', '.jsx', '.js']
      },
      optimizeDeps: {
        exclude: ['react-strict-dom']
      },
      define: {
        'process.env': {}
      }
    })
  }
}

export default config
