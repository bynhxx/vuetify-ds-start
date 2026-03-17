import { setup } from '@storybook/vue3-vite'
import type { Preview } from '@storybook/vue3-vite'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import '../src/styles/tokens.css'
import { lightTheme } from '../src/themes/light'
import { darkTheme } from '../src/themes/dark'

// ── Vuetify com todos os componentes e diretivas registrados explicitamente ───
// Necessário no Storybook porque o vite-plugin-vuetify (que faz o registro
// automático na app principal) não é usado no viteFinal por gerar
// módulos virtuais incompatíveis com o servidor do Storybook.
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: { light: lightTheme, dark: darkTheme },
    variations: {
      colors: ['primary', 'secondary', 'error', 'success'],
      lighten: 3,
      darken: 3,
    },
  },
  icons: { defaultSet: 'mdi', aliases, sets: { mdi } },
})

setup((app) => app.use(vuetify))

// ── Preview ───────────────────────────────────────────────────────────────────

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Vuetify theme',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark',  title: 'Dark',  icon: 'moon' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (Story, context) => ({
      components: { Story },
      setup() {
        return { theme: context.globals.theme || 'light' }
      },
      template: '<v-app :theme="theme"><v-main><Story /></v-main></v-app>',
    }),
  ],

  parameters: {
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date:  /Date$/,
      },
    },
  },
}

export default preview
