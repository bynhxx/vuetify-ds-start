import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { semantic, onColors, surfaceLight, surfaceDark } from '@/tokens/color'

const meta: Meta = {
  title: 'Tokens/Colors',
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof meta>

// ── helpers ───────────────────────────────────────────────────────────────────

function swatchRow(title: string, entries: [string, string][], onMap?: Record<string, string>) {
  const items = entries.map(([name, hex]) => {
    const on = onMap?.[`on-${name}`] ?? (isLight(hex) ? '#212121' : '#FFFFFF')
    return `
      <div style="display:flex;flex-direction:column;align-items:center;gap:6px;min-width:96px;">
        <div style="
          width:80px;height:80px;border-radius:10px;
          background:${hex};
          border:1px solid rgba(128,128,128,.15);
          display:flex;align-items:center;justify-content:center;
        ">
          <span style="font-size:9px;font-family:monospace;color:${on};font-weight:600;">${hex.toUpperCase()}</span>
        </div>
        <span style="font-size:11px;font-weight:600;text-align:center;max-width:96px;word-break:break-word;">${name}</span>
      </div>
    `
  }).join('')

  return `
    <div style="margin-bottom:32px;">
      <div style="font-size:13px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;
                  opacity:.55;margin-bottom:12px;">${title}</div>
      <div style="display:flex;flex-wrap:wrap;gap:16px;">${items}</div>
    </div>
  `
}

function isLight(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 140
}

// ── stories ───────────────────────────────────────────────────────────────────

export const Semantic: Story = {
  name: 'Semantic',
  render: () => ({
    setup() {
      const brand = Object.entries(semantic).filter(([k]) =>
        !k.includes('darken') && !k.includes('lighten'))
      const variants = Object.entries(semantic).filter(([k]) =>
        k.includes('darken') || k.includes('lighten'))
      return { brand, variants }
    },
    template: `
      <v-sheet class="pa-8">
        <div class="text-h5 font-weight-bold mb-6">Cores Semânticas</div>
        <div v-html="brandHtml" />
        <div v-html="variantHtml" />
      </v-sheet>
    `,
    computed: {
      brandHtml() {
        return swatchRow('Marca & Estado', this.brand as [string, string][])
      },
      variantHtml() {
        return swatchRow('Variações (darken / lighten)', this.variants as [string, string][])
      },
    },
  }),
}

export const OnColors: Story = {
  name: 'On-Colors',
  render: () => ({
    template: `
      <v-sheet class="pa-8">
        <div class="text-h5 font-weight-bold mb-2">On-Colors</div>
        <div class="text-body-2 text-medium-emphasis mb-6">
          Cores de texto usadas sobre cada cor de fundo — calculadas por contraste WCAG AA.
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:12px;">
          ${Object.entries(onColors).map(([name, hex]) => {
            const bg = (semantic as Record<string,string>)[name.replace('on-', '')] ?? '#888'
            return `
              <div style="border-radius:10px;overflow:hidden;min-width:140px;border:1px solid rgba(128,128,128,.15);">
                <div style="background:${bg};height:48px;display:flex;align-items:center;justify-content:center;">
                  <span style="color:${hex};font-weight:700;font-size:13px;">Aa</span>
                </div>
                <div style="padding:8px 10px;">
                  <div style="font-size:11px;font-weight:600;">${name}</div>
                  <div style="font-size:10px;opacity:.6;font-family:monospace;">${hex.toUpperCase()}</div>
                </div>
              </div>
            `
          }).join('')}
        </div>
      </v-sheet>
    `,
  }),
}

export const SurfaceLight: Story = {
  name: 'Surface Light',
  render: () => ({
    template: `
      <v-sheet class="pa-8">
        <div class="text-h5 font-weight-bold mb-6">Superfícies — Light Theme</div>
        <div style="display:flex;flex-wrap:wrap;gap:16px;">
          ${Object.entries(surfaceLight).map(([name, hex]) => `
            <div style="display:flex;flex-direction:column;align-items:center;gap:6px;min-width:96px;">
              <div style="
                width:80px;height:80px;border-radius:10px;background:${hex};
                border:1px solid rgba(0,0,0,.12);
                display:flex;align-items:center;justify-content:center;
              ">
                <span style="font-size:9px;font-family:monospace;font-weight:600;color:#555;">
                  ${hex.toUpperCase()}
                </span>
              </div>
              <span style="font-size:11px;font-weight:600;text-align:center;max-width:96px;word-break:break-word;">
                ${name}
              </span>
            </div>
          `).join('')}
        </div>
      </v-sheet>
    `,
  }),
}

export const SurfaceDark: Story = {
  name: 'Surface Dark',
  render: () => ({
    template: `
      <v-sheet class="pa-8" color="background">
        <div class="text-h5 font-weight-bold mb-6">Superfícies — Dark Theme</div>
        <div style="display:flex;flex-wrap:wrap;gap:16px;">
          ${Object.entries(surfaceDark).map(([name, hex]) => `
            <div style="display:flex;flex-direction:column;align-items:center;gap:6px;min-width:96px;">
              <div style="
                width:80px;height:80px;border-radius:10px;background:${hex};
                border:1px solid rgba(255,255,255,.12);
                display:flex;align-items:center;justify-content:center;
              ">
                <span style="font-size:9px;font-family:monospace;font-weight:600;color:#ccc;">
                  ${hex.toUpperCase()}
                </span>
              </div>
              <span style="font-size:11px;font-weight:600;text-align:center;max-width:96px;word-break:break-word;">
                ${name}
              </span>
            </div>
          `).join('')}
        </div>
      </v-sheet>
    `,
  }),
}

export const AllColors: Story = {
  name: 'All Colors',
  render: () => ({
    template: `
      <v-sheet class="pa-8">
        <div class="text-h5 font-weight-bold mb-8">Todos os Tokens de Cor</div>

        <div class="text-subtitle-2 font-weight-bold text-uppercase text-medium-emphasis mb-3">
          Semânticas de marca
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:32px;">
          ${['primary','secondary','accent','success','warning','error','info'].map(name => {
            const hex = (semantic as Record<string,string>)[name]
            return `<v-chip :color="'${name}'" variant="elevated" label>${name} · ${hex}</v-chip>`
          }).join('')}
        </div>

        <div class="text-subtitle-2 font-weight-bold text-uppercase text-medium-emphasis mb-3">
          Variações
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:32px;">
          ${['primary-darken-1','primary-lighten-1','secondary-darken-1','secondary-lighten-1'].map(name => {
            const hex = (semantic as Record<string,string>)[name]
            return `<v-chip color="primary" variant="tonal" label>${name} · ${hex}</v-chip>`
          }).join('')}
        </div>

        <v-divider class="mb-6" />

        <div class="text-subtitle-2 font-weight-bold text-uppercase text-medium-emphasis mb-3">
          Superfícies — via Vuetify theme
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          ${['background','surface','surface-bright','surface-light','surface-variant'].map(name =>
            `<v-chip variant="tonal" label>${name}</v-chip>`
          ).join('')}
        </div>
      </v-sheet>
    `,
  }),
}
