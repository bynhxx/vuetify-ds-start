import type { Preview } from '@storybook/vue3-vite'
import { setup } from '@storybook/vue3-vite'
import { withThemeByDataAttribute } from '@storybook/addon-themes'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import '../src/styles/tokens.css'
import { lightTheme } from '../src/themes/light'
import { darkTheme } from '../src/themes/dark'

// ── Vuetify instance ──────────────────────────────────────────────────────────
const vuetify = createVuetify({
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

// Registra Vuetify como plugin global em todas as stories
setup((app) => app.use(vuetify))

// ── Decorator: wrap every story in <v-app :theme="..."> ────────────────────────
const withVuetifyTheme = (Story: any, context: any) => ({
  components: { Story },
  setup() {
    return { theme: context.globals.theme || 'light' }
  },
  template: `
    <v-app :theme="theme">
      <v-main>
        <v-container fluid class="pa-6">
          <Story />
        </v-container>
      </v-main>
    </v-app>
  `,
})

const preview: Preview = {
  // globalTypes registra o toolbar de tema na UI do Storybook
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
    // Aplica data-attribute no container (compatibilidade Tokens Studio)
    withThemeByDataAttribute({
      themes: { light: 'light', dark: 'dark' },
      defaultTheme: 'light',
      attributeName: 'data-sb-theme',
    }),
    // Wraps stories em <v-app> com o tema selecionado
    withVuetifyTheme,
  ],

  parameters: {
    backgrounds: { disable: true },  // Vuetify gerencia backgrounds via tema
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date:  /Date$/,
      },
    },
  },
}

export default preview
