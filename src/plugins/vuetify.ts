import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import { lightTheme } from '@/themes/light'
import { darkTheme } from '@/themes/dark'

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: lightTheme,
      dark:  darkTheme,
    },
    variations: {
      colors:  ['primary', 'secondary', 'error', 'success'],
      lighten: 3,
      darken:  3,
    },
  },
  defaults: {
    global: {
      // Fonte Inter aplicada globalmente via settings.scss ($body-font-family)
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
})
