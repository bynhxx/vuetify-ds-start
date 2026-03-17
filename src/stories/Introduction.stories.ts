import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta = {
  title: 'Design System/Introduction',
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof meta>

export const Welcome: Story = {
  name: 'Welcome',
  render: () => ({
    template: `
      <v-sheet class="pa-10" max-width="760" style="margin: 0 auto;">
        <div class="text-h4 font-weight-bold mb-1">vuetify-ds-starter</div>
        <div class="text-subtitle-1 text-medium-emphasis mb-8">
          Design System · Vue 3 + Vuetify 3 + TypeScript
        </div>

        <div class="text-body-1 mb-8">
          Este Storybook é a documentação viva do DS. Cada story é gerada a partir dos mesmos
          tokens que alimentam a aplicação — cores, tipografia, espaçamento e border-radius
          vivem em <code>src/tokens/</code> e compilam via Style Dictionary v5.
        </div>

        <v-row class="mb-8">
          <v-col cols="12" sm="6">
            <v-card variant="tonal" color="primary" rounded="lg">
              <v-card-title class="text-subtitle-2 font-weight-bold">Stack</v-card-title>
              <v-card-text class="text-body-2">
                <div>Vue 3 + Composition API</div>
                <div>Vuetify 3.8</div>
                <div>TypeScript</div>
                <div>Vite + pnpm + Style Dictionary v5</div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6">
            <v-card variant="tonal" color="secondary" rounded="lg">
              <v-card-title class="text-subtitle-2 font-weight-bold">Tokens</v-card-title>
              <v-card-text class="text-body-2">
                <div>Cores semânticas + superfícies light/dark</div>
                <div>Tipografia Inter (13 níveis)</div>
                <div>Espaçamento grid 4px (0–24)</div>
                <div>Border Radius (none → full)</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-divider class="mb-6" />

        <div class="text-h6 mb-4">Categorias</div>
        <v-list lines="two" rounded="lg" variant="tonal">
          <v-list-item
            prepend-icon="mdi-palette"
            title="Tokens › Colors"
            subtitle="Cores semânticas (primary, success…) e superfícies (background, surface…)"
          />
          <v-divider />
          <v-list-item
            prepend-icon="mdi-format-size"
            title="Tokens › Typography"
            subtitle="Escala tipográfica completa: h1 → overline"
          />
          <v-divider />
          <v-list-item
            prepend-icon="mdi-ruler"
            title="Tokens › Spacing"
            subtitle="Grid 4px — multiplicadores 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24"
          />
          <v-divider />
          <v-list-item
            prepend-icon="mdi-rounded-corner"
            title="Tokens › Radius"
            subtitle="none (0) · sm (4px) · md (8px) · lg (16px) · xl (24px) · full (9999px)"
          />
          <v-divider />
          <v-list-item
            prepend-icon="mdi-button-cursor"
            title="Components › Button"
            subtitle="Variantes · cores · tamanhos · estados (disabled, loading)"
          />
          <v-divider />
          <v-list-item
            prepend-icon="mdi-card-outline"
            title="Components › Card"
            subtitle="Default · com imagem · outlined · elevation 0–8"
          />
          <v-divider />
          <v-list-item
            prepend-icon="mdi-alert-circle-outline"
            title="Components › Alert"
            subtitle="success · warning · error · info · tonal/outlined/elevated · com título"
          />
          <v-divider />
          <v-list-item
            prepend-icon="mdi-tag-outline"
            title="Components › Chip"
            subtitle="Cores · variantes · closable · com ícone"
          />
        </v-list>

        <v-divider class="my-8" />

        <div class="text-caption text-medium-emphasis">
          Tokens gerados por Style Dictionary v5 · W3C/DTCG para Figma via Tokens Studio ·
          Execute <code>pnpm tokens:build</code> para recompilar
        </div>
      </v-sheet>
    `,
  }),
}
