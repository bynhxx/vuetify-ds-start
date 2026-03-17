import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta = {
  title: 'Components/Card',
  argTypes: {
    elevation: { control: { type: 'range', min: 0, max: 24, step: 1 } },
    variant:   { control: 'select', options: ['elevated', 'outlined', 'tonal', 'flat'] },
    rounded:   { control: 'select', options: ['0', 'sm', '', 'lg', 'xl', 'pill'] },
    title:     { control: 'text' },
    subtitle:  { control: 'text' },
    text:      { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    elevation: 2,
    variant:  'elevated',
    rounded:  'lg',
    title:    'Título do Card',
    subtitle: 'Subtítulo opcional',
    text:     'Conteúdo do card. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  render: (args) => ({
    setup() {
      return {
        elevation: Number(args.elevation ?? 2),
        variant:   String(args.variant   ?? 'elevated'),
        rounded:   String(args.rounded   ?? 'lg'),
        title:     String(args.title     ?? ''),
        subtitle:  String(args.subtitle  ?? ''),
        text:      String(args.text      ?? ''),
      }
    },
    template: `
      <v-card :elevation="elevation" :variant="variant" :rounded="rounded" max-width="400">
        <v-card-title>{{ title }}</v-card-title>
        <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
        <v-card-text>{{ text }}</v-card-text>
        <v-card-actions>
          <v-btn variant="text" color="primary">Ação</v-btn>
          <v-btn variant="tonal" color="primary">Confirmar</v-btn>
        </v-card-actions>
      </v-card>
    `,
  }),
}

export const Variants: Story = {
  name: 'Variants',
  render: () => ({
    template: `
      <v-row>
        <v-col v-for="v in ['elevated','outlined','tonal','flat']" :key="v" cols="12" sm="6">
          <v-card :variant="v" rounded="lg">
            <v-card-title class="text-subtitle-1">{{ v }}</v-card-title>
            <v-card-text class="text-body-2">Card com variant="{{ v }}"</v-card-text>
            <v-card-actions>
              <v-btn variant="text" color="primary" size="small">Ação</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    `,
  }),
}

export const WithImage: Story = {
  name: 'With Image',
  render: () => ({
    template: `
      <v-row>
        <v-col cols="12" sm="5">
          <v-card rounded="lg" max-width="360">
            <v-sheet color="surface-variant" height="180"
              class="d-flex align-center justify-center rounded-t-lg">
              <v-icon icon="mdi-image" size="48" opacity=".3" />
            </v-sheet>
            <v-card-title>Card com imagem</v-card-title>
            <v-card-text>Imagem de capa com área reservada.</v-card-text>
            <v-card-actions>
              <v-btn variant="text" color="primary">Ver mais</v-btn>
              <v-spacer />
              <v-btn icon="mdi-heart-outline"       variant="text" />
              <v-btn icon="mdi-share-variant-outline" variant="text" />
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="5">
          <v-card rounded="lg" max-width="360" class="d-flex flex-row" height="160">
            <v-sheet color="surface-variant" width="130" height="160"
              class="d-flex align-center justify-center rounded-s-lg flex-shrink-0">
              <v-icon icon="mdi-image" opacity=".3" />
            </v-sheet>
            <div>
              <v-card-title class="text-subtitle-1">Card horizontal</v-card-title>
              <v-card-text class="text-body-2">Layout side-by-side.</v-card-text>
            </div>
          </v-card>
        </v-col>
      </v-row>
    `,
  }),
}

export const Elevation: Story = {
  name: 'Elevation',
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:20px;padding:16px;">
        <v-card
          v-for="n in [0,1,2,4,8,12,16,24]"
          :key="n"
          :elevation="n"
          rounded="lg"
          style="width:120px;"
          class="pa-4 text-center"
        >
          <div class="text-subtitle-2 font-weight-bold">{{ n }}</div>
          <div class="text-caption text-medium-emphasis">elev-{{ n }}</div>
        </v-card>
      </div>
    `,
  }),
}

export const Interactive: Story = {
  name: 'Interactive',
  render: () => ({
    template: `
      <v-row>
        <v-col v-for="i in 3" :key="i" cols="12" sm="4">
          <v-card rounded="lg" hover>
            <v-card-item>
              <template #prepend>
                <v-avatar :color="['primary','secondary','accent'][i-1]" variant="tonal">
                  <v-icon :icon="['mdi-palette','mdi-code-tags','mdi-rocket-launch'][i-1]" />
                </v-avatar>
              </template>
              <v-card-title class="text-subtitle-1">Card {{ i }}</v-card-title>
              <v-card-subtitle>hover + ripple</v-card-subtitle>
            </v-card-item>
            <v-card-text class="text-body-2">
              Card clicável com efeito hover.
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    `,
  }),
}
