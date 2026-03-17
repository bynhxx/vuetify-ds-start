import type { StorybookConfig } from '@storybook/vue3-vite'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

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

  /**
   * viteFinal: NÃO inclui vite-plugin-vuetify aqui.
   *
   * Motivo: vite-plugin-vuetify gera módulos virtuais
   * (virtual:__void__, virtual:plugin-vuetify:styles/*) que o servidor
   * de desenvolvimento do Storybook não consegue resolver, causando
   * ERR_ABORTED 404 no browser.
   *
   * No Storybook isso é desnecessário porque:
   *  1. Estilos: importados globalmente via 'vuetify/styles' no preview.ts
   *  2. Componentes: registrados globalmente via app.use(vuetify) no setup()
   *  3. Tree-shaking: não se aplica a um ambiente de desenvolvimento
   */
  async viteFinal(config) {
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
