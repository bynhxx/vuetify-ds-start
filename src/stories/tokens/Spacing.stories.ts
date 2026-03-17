import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { spacingTokens } from '@/tokens/spacing'

const meta: Meta = {
  title: 'Tokens/Spacing',
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof meta>

// ── Scale ─────────────────────────────────────────────────────────────────────

export const Scale: Story = {
  name: 'Scale',
  render: () => ({
    setup() {
      // Object.entries do px e do rem em paralelo — sem cast de tipo
      const pxEntries = Object.entries(spacingTokens.px)
      const remEntries = Object.entries(spacingTokens.rem)
      const remByKey = Object.fromEntries(remEntries)

      const maxPx = 96
      const items = pxEntries.map(([key, px]) => ({
        key,
        px,
        rem: remByKey[key] ?? '',
        num: parseInt(px),
        barPct: Math.max(2, Math.round((parseInt(px) / maxPx) * 100)),
      }))

      return { items }
    },
    template: `
      <v-sheet class="pa-8">
        <div class="text-h5 font-weight-bold mb-2">Escala de Espaçamento</div>
        <div class="text-body-2 text-medium-emphasis mb-8">
          Grid 4px · multiplicadores 0–24 · alinhado com $spacer do Vuetify
        </div>

        <div style="display:flex;flex-direction:column;gap:10px;">
          <div v-for="item in items" :key="item.key"
            style="display:flex;align-items:center;gap:16px;">
            <div style="width:32px;text-align:right;font-size:12px;font-family:monospace;opacity:.6;flex-shrink:0;">
              {{ item.key }}
            </div>
            <div
              :style="{
                width: item.barPct + '%',
                minWidth: '4px',
                height: '24px',
                background: 'rgb(var(--v-theme-primary))',
                borderRadius: '3px',
                flexShrink: 0
              }"
            ></div>
            <div style="font-size:12px;font-family:monospace;opacity:.7;flex-shrink:0;">
              {{ item.px }}
            </div>
            <div style="font-size:11px;opacity:.45;">
              {{ item.rem }}
            </div>
          </div>
        </div>
      </v-sheet>
    `,
  }),
}

// ── Semantic ──────────────────────────────────────────────────────────────────

export const Semantic: Story = {
  name: 'Semantic Aliases',
  render: () => ({
    setup() {
      const maxPx = 96
      const aliases = Object.entries(spacingTokens.semantic).map(([name, px]) => ({
        name,
        px: String(px),
        barPct: Math.max(2, Math.round((parseInt(String(px)) / maxPx) * 100)),
      }))

      const grid = Object.entries(spacingTokens.grid).map(([name, px]) => ({
        name,
        px: String(px),
      }))

      return { aliases, grid }
    },
    template: `
      <v-sheet class="pa-8">
        <div class="text-h5 font-weight-bold mb-2">Aliases Semânticos</div>
        <div class="text-body-2 text-medium-emphasis mb-8">
          Nomes convenientes derivados da escala — usar em vez de valores hardcoded.
        </div>

        <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:48px;">
          <div v-for="item in aliases" :key="item.name"
            style="display:flex;align-items:center;gap:16px;">
            <div style="width:64px;font-size:12px;font-weight:600;flex-shrink:0;">
              {{ item.name }}
            </div>
            <div
              :style="{
                width: item.barPct + '%',
                minWidth: '4px',
                height: '28px',
                background: 'rgb(var(--v-theme-secondary))',
                borderRadius: '4px',
                flexShrink: 0
              }"
            ></div>
            <div style="font-size:12px;font-family:monospace;opacity:.7;">
              {{ item.px }}
            </div>
          </div>
        </div>

        <v-divider class="mb-6" />

        <div class="text-h6 mb-4">Grid Layout</div>
        <v-row>
          <v-col v-for="item in grid" :key="item.name" cols="12" sm="4">
            <v-card variant="tonal" color="surface-variant" class="pa-4 text-center">
              <div class="text-subtitle-2 font-weight-bold">{{ item.name }}</div>
              <div class="text-caption text-medium-emphasis">{{ item.px }}</div>
            </v-card>
          </v-col>
        </v-row>
      </v-sheet>
    `,
  }),
}
