import type { StorybookConfig } from '@storybook/vue3-vite'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

const root = fileURLToPath(new URL('..', import.meta.url))

const config: StorybookConfig = {
  stories: ['../src/stories/**/*.stories.@(ts|tsx)', '../src/stories/**/*.mdx'],

  addons: [
    '@storybook/addon-themes',
  ],

  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },

  async viteFinal(config) {
    const { default: vuetify } = await import('vite-plugin-vuetify')

    config.plugins = [
      ...(config.plugins ?? []),
      vuetify({
        autoImport: true,
        // 'none' evita o módulo virtual SASS no contexto do Storybook
        // (os estilos base são importados via 'vuetify/styles' no preview.ts)
        styles: 'none',
      }),
    ]

    config.resolve = {
      ...config.resolve,
      alias: {
        ...(config.resolve?.alias ?? {}),
        '@': resolve(root, 'src'),
      },
    }

    return config
  },
}

export default config
