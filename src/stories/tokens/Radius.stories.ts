import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { radiusTokens } from '@/tokens/radius'

const meta: Meta = {
  title: 'Tokens/Radius',
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof meta>

const TOKENS = Object.entries(radiusTokens) as [string, string][]

export const AllValues: Story = {
  name: 'All Values',
  render: () => ({
    template: `
      <v-sheet class="pa-8">
        <div class="text-h5 font-weight-bold mb-2">Border Radius</div>
        <div class="text-body-2 text-medium-emphasis mb-8">
          Base: 8px ($border-radius-root) · escala: none → full
        </div>

        <div style="display:flex;flex-wrap:wrap;gap:24px;align-items:flex-end;">
          ${TOKENS.map(([name, value]) => `
            <div style="display:flex;flex-direction:column;align-items:center;gap:10px;">
              <div style="
                width:96px;
                height:96px;
                border-radius:${value === '9999px' ? '9999px' : value};
                background:rgb(var(--v-theme-primary));
                opacity:0.85;
              "></div>
              <div style="text-align:center;">
                <div style="font-size:13px;font-weight:700;">${name}</div>
                <div style="font-size:11px;font-family:monospace;opacity:.6;">${value}</div>
              </div>
            </div>
          `).join('')}
        </div>

        <v-divider class="my-10" />

        <div class="text-h6 mb-4">Cards com cada raio</div>
        <div style="display:flex;flex-wrap:wrap;gap:16px;">
          ${TOKENS.filter(([n]) => n !== 'none').map(([name, value]) => `
            <v-card
              variant="tonal"
              color="primary"
              class="pa-4"
              style="border-radius:${value === '9999px' ? '9999px' : value};min-width:120px;"
            >
              <div class="text-subtitle-2 font-weight-bold">${name}</div>
              <div class="text-caption">${value}</div>
            </v-card>
          `).join('')}
        </div>
      </v-sheet>
    `,
  }),
}

export const VuetifyClasses: Story = {
  name: 'Vuetify Classes',
  render: () => ({
    template: `
      <v-sheet class="pa-8">
        <div class="text-h5 font-weight-bold mb-2">Classes Utilitárias do Vuetify</div>
        <div class="text-body-2 text-medium-emphasis mb-8">
          Com <code>$border-radius-root: 8px</code>, o Vuetify gera automaticamente:
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:16px;">
          <v-card class="rounded-0 pa-4" variant="tonal" color="secondary">
            <div class="text-subtitle-2">.rounded-0</div>
            <div class="text-caption">0px</div>
          </v-card>
          <v-card class="rounded-sm pa-4" variant="tonal" color="secondary">
            <div class="text-subtitle-2">.rounded-sm</div>
            <div class="text-caption">4px (root × 0.5)</div>
          </v-card>
          <v-card class="rounded pa-4" variant="tonal" color="secondary">
            <div class="text-subtitle-2">.rounded</div>
            <div class="text-caption">8px (root)</div>
          </v-card>
          <v-card class="rounded-lg pa-4" variant="tonal" color="secondary">
            <div class="text-subtitle-2">.rounded-lg</div>
            <div class="text-caption">16px (root × 2)</div>
          </v-card>
          <v-card class="rounded-xl pa-4" variant="tonal" color="secondary">
            <div class="text-subtitle-2">.rounded-xl</div>
            <div class="text-caption">24px+</div>
          </v-card>
          <v-card class="rounded-pill pa-4" variant="tonal" color="secondary">
            <div class="text-subtitle-2">.rounded-pill</div>
            <div class="text-caption">9999px</div>
          </v-card>
        </div>
      </v-sheet>
    `,
  }),
}
