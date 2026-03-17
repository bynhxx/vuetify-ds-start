import { createApp } from 'vue'
import App from './App.vue'
import { registerPlugins } from '@/plugins'

// Design tokens — CSS custom properties (--ds-*)
// Importado após vuetify/styles para garantir que as vars do DS não sejam sobrescritas
import '@/styles/tokens.css'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
