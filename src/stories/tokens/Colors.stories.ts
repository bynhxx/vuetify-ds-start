import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { semantic, onColors, surfaceLight, surfaceDark } from '@/tokens/color'

const meta: Meta = {
  title: 'Tokens/Colors',
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof meta>

// ── helpers ───────────────────────────────────────────────────────────────────

function isLight(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 140
}

// ── Semantic ──────────────────────────────────────────────────────────────────

export const Semantic: Story = {
  name: 'Semantic',
  render: () => ({
    setup() {
      const brand = Object.entries(semantic)
        .filter(([k]) => !k.includes('darken') && !k.includes('lighten'))
        .map(([name, hex]) => ({ name, hex, textColor: isLight(hex) ? '#212121' : '#FFFFFF' }))

      const variants = Object.entries(semantic)
        .filter(([k]) => k.includes('darken') || k.includes('lighten'))
        .map(([name, hex]) => ({ name, hex, textColor: isLight(hex) ? '#212121' : '#FFFFFF' }))

      return { brand, variants }
    },
    template: `
      <v-sheet class="pa-8">
        <div class="text-h5 font-weight-bold mb-6">Cores Semânticas</div>

        <div class="text-overline text-medium-emphasis mb-3">Marca &amp; Estado</div>
        <div style="display:flex;flex-wrap:wrap;gap:16px;margin-bottom:32px;">
          <div v-for="t in brand" :key="t.name"
            style="display:flex;flex-direction:column;align-items:center;gap:6px;min-width:96px;">
            <div :style="{
              width:'80px', height:'80px', borderRadius:'10px',
              background: t.hex,
              border:'1px solid rgba(128,128,128,.15)',
              display:'flex', alignItems:'center', justifyContent:'center'
            }">
              <span :style="{ fontSize:'9px', fontFamily:'monospace', color: t.textColor, fontWeight:'600' }">
                {{ t.hex.toUpperCase() }}
              </span>
            </div>
            <span style="font-size:11px;font-weight:600;text-align:center;max-width:96px;word-break:break-word;">
              {{ t.name }}
            </span>
          </div>
        </div>

        <div class="text-overline text-medium-emphasis mb-3">Variações (darken / lighten)</div>
        <div style="display:flex;flex-wrap:wrap;gap:16px;">
          <div v-for="t in variants" :key="t.name"
            style="display:flex;flex-direction:column;align-items:center;gap:6px;min-width:96px;">
            <div :style="{
              width:'80px', height:'80px', borderRadius:'10px',
              background: t.hex,
              border:'1px solid rgba(128,128,128,.15)',
              display:'flex', alignItems:'center', justifyContent:'center'
            }">
              <span :style="{ fontSize:'9px', fontFamily:'monospace', color: t.textColor, fontWeight:'600' }">
                {{ t.hex.toUpperCase() }}
              </span>
            </div>
            <span style="font-size:11px;font-weight:600;text-align:center;max-width:96px;word-break:break-word;">
              {{ t.name }}
            </span>
          </div>
        </div>
      </v-sheet>
    `,
  }),
}

// ── On-Colors ─────────────────────────────────────────────────────────────────

export const OnColors: Story = {
  name: 'On-Colors',
  render: () => ({
    setup() {
      const items = Object.entries(onColors).map(([name, hex]) => {
        const bgKey = name.replace('on-', '')
        const bg = (semantic as Record<string, string>)[bgKey] ?? '#888888'
        return { name, hex, bg }
      })
      return { items }
    },
    template: `
      <v-sheet class="pa-8">
        <div class="text-h5 font-weight-bold mb-2">On-Colors</div>
        <div class="text-body-2 text-medium-emphasis mb-6">
          Cores de texto sobre cada cor de fundo — calculadas por contraste WCAG AA.
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:12px;">
          <div v-for="t in items" :key="t.name"
            style="border-radius:10px;overflow:hidden;min-width:140px;border:1px solid rgba(128,128,128,.15);">
            <div :style="{ background: t.bg, height:'48px', display:'flex', alignItems:'center', justifyContent:'center' }">
              <span :style="{ color: t.hex, fontWeight:'700', fontSize:'13px' }">Aa</span>
            </div>
            <div style="padding:8px 10px;">
              <div style="font-size:11px;font-weight:600;">{{ t.name }}</div>
              <div style="font-size:10px;opacity:.6;font-family:monospace;">{{ t.hex.toUpperCase() }}</div>
            </div>
          </div>
        </div>
      </v-sheet>
    `,
  }),
}

// ── Surface Light ─────────────────────────────────────────────────────────────

export const SurfaceLight: Story = {
  name: 'Surface Light',
  render: () => ({
    setup() {
      const items = Object.entries(surfaceLight).map(([name, hex]) => ({ name, hex }))
      return { items }
    },
    template: `
      <v-sheet class="pa-8">
        <div class="text-h5 font-weight-bold mb-6">Superfícies — Light Theme</div>
        <div style="display:flex;flex-wrap:wrap;gap:16px;">
          <div v-for="t in items" :key="t.name"
            style="display:flex;flex-direction:column;align-items:center;gap:6px;min-width:96px;">
            <div :style="{
              width:'80px', height:'80px', borderRadius:'10px',
              background: t.hex,
              border:'1px solid rgba(0,0,0,.12)',
              display:'flex', alignItems:'center', justifyContent:'center'
            }">
              <span style="font-size:9px;font-family:monospace;font-weight:600;color:#555;">
                {{ t.hex.toUpperCase() }}
              </span>
            </div>
            <span style="font-size:11px;font-weight:600;text-align:center;max-width:96px;word-break:break-word;">
              {{ t.name }}
            </span>
          </div>
        </div>
      </v-sheet>
    `,
  }),
}

// ── Surface Dark ──────────────────────────────────────────────────────────────

export const SurfaceDark: Story = {
  name: 'Surface Dark',
  render: () => ({
    setup() {
      const items = Object.entries(surfaceDark).map(([name, hex]) => ({ name, hex }))
      return { items }
    },
    template: `
      <v-sheet class="pa-8" color="background">
        <div class="text-h5 font-weight-bold mb-6">Superfícies — Dark Theme</div>
        <div style="display:flex;flex-wrap:wrap;gap:16px;">
          <div v-for="t in items" :key="t.name"
            style="display:flex;flex-direction:column;align-items:center;gap:6px;min-width:96px;">
            <div :style="{
              width:'80px', height:'80px', borderRadius:'10px',
              background: t.hex,
              border:'1px solid rgba(255,255,255,.12)',
              display:'flex', alignItems:'center', justifyContent:'center'
            }">
              <span style="font-size:9px;font-family:monospace;font-weight:600;color:#ccc;">
                {{ t.hex.toUpperCase() }}
              </span>
            </div>
            <span style="font-size:11px;font-weight:600;text-align:center;max-width:96px;word-break:break-word;">
              {{ t.name }}
            </span>
          </div>
        </div>
      </v-sheet>
    `,
  }),
}

// ── All Colors ────────────────────────────────────────────────────────────────

export const AllColors: Story = {
  name: 'All Colors',
  render: () => ({
    setup() {
      const brandNames = ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info']
      const variantNames = ['primary-darken-1', 'primary-lighten-1', 'secondary-darken-1', 'secondary-lighten-1']
      const surfaceNames = ['background', 'surface', 'surface-bright', 'surface-light', 'surface-variant']
      return { brandNames, variantNames, surfaceNames }
    },
    template: `
      <v-sheet class="pa-8">
        <div class="text-h5 font-weight-bold mb-8">Todos os Tokens de Cor</div>

        <div class="text-subtitle-2 font-weight-bold text-uppercase text-medium-emphasis mb-3">
          Semânticas de marca
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:32px;">
          <v-chip v-for="name in brandNames" :key="name" :color="name" variant="elevated" label>
            {{ name }}
          </v-chip>
        </div>

        <div class="text-subtitle-2 font-weight-bold text-uppercase text-medium-emphasis mb-3">
          Variações
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:32px;">
          <v-chip v-for="name in variantNames" :key="name" color="primary" variant="tonal" label>
            {{ name }}
          </v-chip>
        </div>

        <v-divider class="mb-6" />

        <div class="text-subtitle-2 font-weight-bold text-uppercase text-medium-emphasis mb-3">
          Superfícies — via Vuetify theme
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          <v-chip v-for="name in surfaceNames" :key="name" variant="tonal" label>
            {{ name }}
          </v-chip>
        </div>
      </v-sheet>
    `,
  }),
}
