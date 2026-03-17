import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { spacingTokens } from '@/tokens/spacing'

const meta: Meta = {
  title: 'Tokens/Spacing',
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof meta>

const STEPS = Object.entries(spacingTokens.px) as [string, string][]
const MAX_PX = 96

export const Scale: Story = {
  name: 'Scale',
  render: () => ({
    template: `
      <v-sheet class="pa-8">
        <div class="text-h5 font-weight-bold mb-2">Escala de Espaçamento</div>
        <div class="text-body-2 text-medium-emphasis mb-8">
          Grid 4px · multiplicadores 0–24 · alinhado com $spacer do Vuetify
        </div>

        <div style="display:flex;flex-direction:column;gap:10px;">
          ${STEPS.map(([step, px]) => {
            const num = parseInt(px)
            const pct = Math.max(2, Math.round((num / MAX_PX) * 100))
            return `
              <div style="display:flex;align-items:center;gap:16px;">
                <div style="width:32px;text-align:right;font-size:12px;font-family:monospace;opacity:.6;flex-shrink:0;">
                  ${step}
                </div>
                <div style="width:${pct}%;min-width:4px;height:24px;background:rgb(var(--v-theme-primary));border-radius:3px;flex-shrink:0;transition:width .2s;"></div>
                <div style="font-size:12px;font-family:monospace;opacity:.7;flex-shrink:0;">
                  ${px}
                </div>
                <div style="font-size:11px;opacity:.45;">
                  ${spacingTokens.rem[step as unknown as keyof typeof spacingTokens.rem]}
                </div>
              </div>
            `
          }).join('')}
        </div>
      </v-sheet>
    `,
  }),
}

export const Semantic: Story = {
  name: 'Semantic Aliases',
  render: () => ({
    template: `
      <v-sheet class="pa-8">
        <div class="text-h5 font-weight-bold mb-2">Aliases Semânticos</div>
        <div class="text-body-2 text-medium-emphasis mb-8">
          Nomes convenientes derivados da escala — usar em vez de valores hardcoded.
        </div>
        <div style="display:flex;flex-direction:column;gap:12px;">
          ${Object.entries(spacingTokens.semantic).map(([name, px]) => {
            const num = parseInt(px as string)
            const pct = Math.max(2, Math.round((num / MAX_PX) * 100))
            return `
              <div style="display:flex;align-items:center;gap:16px;">
                <div style="width:64px;font-size:12px;font-weight:600;flex-shrink:0;">${name}</div>
                <div style="width:${pct}%;min-width:4px;height:28px;background:rgb(var(--v-theme-secondary));border-radius:4px;flex-shrink:0;"></div>
                <div style="font-size:12px;font-family:monospace;opacity:.7;">${px}</div>
              </div>
            `
          }).join('')}
        </div>

        <v-divider class="my-8" />

        <div class="text-h6 mb-4">Grid Layout</div>
        <v-row>
          ${Object.entries(spacingTokens.grid).map(([name, px]) => `
            <v-col cols="12" sm="4">
              <v-card variant="tonal" color="surface-variant" class="pa-4 text-center">
                <div class="text-subtitle-2 font-weight-bold">${name}</div>
                <div class="text-caption text-medium-emphasis">${px}</div>
              </v-card>
            </v-col>
          `).join('')}
        </v-row>
      </v-sheet>
    `,
  }),
}
