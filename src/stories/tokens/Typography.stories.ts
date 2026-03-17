import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { typographyTokens } from '@/tokens/typography'

const meta: Meta = {
  title: 'Tokens/Typography',
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof meta>

const LEVELS = Object.entries(typographyTokens.scale) as [
  string,
  { size: string; weight: number; lineHeight: number | string; letterSpacing: string; textTransform: string }
][]

export const TypeScale: Story = {
  name: 'Type Scale',
  render: () => ({
    template: `
      <v-sheet class="pa-8">
        <div class="text-h5 font-weight-bold mb-2">Escala Tipográfica</div>
        <div class="text-body-2 text-medium-emphasis mb-8">
          Fonte: Inter · Base: 16px · 13 níveis (h1–overline)
        </div>

        <v-table density="compact">
          <thead>
            <tr>
              <th style="width:110px">Token</th>
              <th style="width:70px">Tamanho</th>
              <th style="width:70px">Peso</th>
              <th style="width:80px">Line-h.</th>
              <th>Exemplo</th>
            </tr>
          </thead>
          <tbody>
            ${LEVELS.map(([level, s]) => `
              <tr>
                <td>
                  <code style="font-size:12px;opacity:.75">${level}</code>
                </td>
                <td class="text-caption text-medium-emphasis">${s.size}</td>
                <td class="text-caption text-medium-emphasis">${s.weight}</td>
                <td class="text-caption text-medium-emphasis">${s.lineHeight}</td>
                <td>
                  <span class="text-${level}" style="${s.textTransform !== 'none' ? `text-transform:${s.textTransform}` : ''}">
                    ${level === 'h1' ? 'Aa' : level === 'h2' ? 'Aa' : 'The quick brown fox'}
                  </span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </v-table>
      </v-sheet>
    `,
  }),
}

export const Showcase: Story = {
  name: 'Showcase',
  render: () => ({
    template: `
      <v-sheet class="pa-10" max-width="700">
        <div class="text-h1" style="font-size:3rem">h1 — Display</div>
        <v-divider class="my-4" />
        <div class="text-h2" style="font-size:2.25rem">h2 — Título grande</div>
        <div class="text-h3" style="font-size:1.75rem">h3 — Seção principal</div>
        <div class="text-h4">h4 — Sub-seção</div>
        <div class="text-h5">h5 — Título de card</div>
        <div class="text-h6">h6 — Título menor</div>
        <v-divider class="my-4" />
        <div class="text-subtitle-1">subtitle-1 — Subtítulo principal · peso 400 · 1rem</div>
        <div class="text-subtitle-2">subtitle-2 — Subtítulo secundário · peso 500 · 0.875rem</div>
        <v-divider class="my-4" />
        <div class="text-body-1">body-1 — Corpo principal. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
        <div class="text-body-2 mt-2">body-2 — Corpo secundário. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
        <v-divider class="my-4" />
        <div class="text-button">button — AÇÃO DE BOTÃO</div>
        <div class="text-caption mt-2">caption — Legenda · metadados · rótulos secundários</div>
        <div class="text-overline mt-2">overline — RÓTULO SUPERIOR</div>
      </v-sheet>
    `,
  }),
}

export const FontFamilies: Story = {
  name: 'Font Families',
  render: () => ({
    template: `
      <v-sheet class="pa-8">
        <div class="text-h5 font-weight-bold mb-6">Famílias Tipográficas</div>

        <v-card variant="outlined" class="mb-4 pa-5">
          <div class="text-overline text-medium-emphasis mb-2">sans · Inter</div>
          <div style="font-family:'Inter',sans-serif;font-size:2rem;font-weight:300;">Light 300 — Aa Bb Cc 123</div>
          <div style="font-family:'Inter',sans-serif;font-size:2rem;font-weight:400;">Regular 400 — Aa Bb Cc 123</div>
          <div style="font-family:'Inter',sans-serif;font-size:2rem;font-weight:500;">Medium 500 — Aa Bb Cc 123</div>
          <div style="font-family:'Inter',sans-serif;font-size:2rem;font-weight:700;">Bold 700 — Aa Bb Cc 123</div>
        </v-card>

        <v-card variant="outlined" class="pa-5">
          <div class="text-overline text-medium-emphasis mb-2">mono · JetBrains Mono</div>
          <div style="font-family:'JetBrains Mono',monospace;font-size:1.2rem;">
            const token = { $value: '#5B638E', $type: 'color' }
          </div>
        </v-card>
      </v-sheet>
    `,
  }),
}
