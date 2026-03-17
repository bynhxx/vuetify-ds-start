import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import { lightTheme } from '@/themes/light'
import { darkTheme } from '@/themes/dark'
import { semantic } from '@/tokens/color'

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: lightTheme,
      dark:  darkTheme,
    },
    variations: {
      // Gera CSS vars: --v-theme-primary-lighten-1..3, --v-theme-primary-darken-1..3
      colors: [
        'primary',
        'secondary',
        semantic.error    ? 'error'   : '',
        semantic.success  ? 'success' : '',
      ].filter(Boolean) as string[],
      lighten: 3,
      darken:  3,
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
})
