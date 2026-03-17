import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Components/Card',
  tags: ['autodocs'],
  argTypes: {
    elevation: {
      control: { type: 'range', min: 0, max: 24, step: 1 },
      description: 'Nível de elevação (sombra)',
    },
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'tonal', 'flat'],
      description: 'Variante visual',
    },
    rounded: {
      control: 'select',
      options: ['0', 'sm', '', 'lg', 'xl', 'pill'],
      description: 'Border radius',
    },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    text: { control: 'text' },
  },
  args: {
    elevation: 2,
    variant: 'elevated',
    rounded: 'lg',
    title: 'Título do Card',
    subtitle: 'Subtítulo opcional',
    text: 'Conteúdo do card. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus.',
  },
  render: (args: Record<string, unknown>) => ({
    setup: () => ({ args }),
    template: `
      <v-card
        :elevation="args.elevation"
        :variant="args.variant"
        :rounded="args.rounded"
        max-width="400"
      >
        <v-card-title>{{ args.title }}</v-card-title>
        <v-card-subtitle>{{ args.subtitle }}</v-card-subtitle>
        <v-card-text>{{ args.text }}</v-card-text>
        <v-card-actions>
          <v-btn variant="text" color="primary">Ação</v-btn>
          <v-btn variant="tonal" color="primary">Confirmar</v-btn>
        </v-card-actions>
      </v-card>
    `,
  }),
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
  name: 'Variants',
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <v-row>
        <v-col v-for="variant in ['elevated','outlined','tonal','flat']" :key="variant" cols="12" sm="6">
          <v-card :variant="variant" rounded="lg" class="pa-1">
            <v-card-title class="text-subtitle-1">{{ variant }}</v-card-title>
            <v-card-text class="text-body-2">Card com variant="{{ variant }}"</v-card-text>
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
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <v-row>
        <v-col cols="12" sm="5">
          <v-card rounded="lg" max-width="360">
            <v-img
              src="https://picsum.photos/seed/ds/400/200"
              height="180"
              cover
              gradient="to bottom, transparent 60%, rgba(0,0,0,.5)"
            >
              <template #placeholder>
                <v-sheet color="surface-variant" height="180" class="d-flex align-center justify-center">
                  <v-icon icon="mdi-image" size="48" opacity=".3" />
                </v-sheet>
              </template>
            </v-img>
            <v-card-title>Card com imagem</v-card-title>
            <v-card-text>Imagem de capa com gradient overlay.</v-card-text>
            <v-card-actions>
              <v-btn variant="text" color="primary">Ver mais</v-btn>
              <v-spacer />
              <v-btn icon="mdi-heart-outline" variant="text" />
              <v-btn icon="mdi-share-variant-outline" variant="text" />
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="5">
          <v-card rounded="lg" max-width="360" class="d-flex flex-row" height="160">
            <v-img
              src="https://picsum.photos/seed/ds2/200/200"
              width="130"
              cover
              class="rounded-s-lg flex-grow-0"
            >
              <template #placeholder>
                <v-sheet color="surface-variant" width="130" height="160" class="d-flex align-center justify-center rounded-s-lg">
                  <v-icon icon="mdi-image" opacity=".3" />
                </v-sheet>
              </template>
            </v-img>
            <div class="flex-1-1">
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
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:20px;padding:16px;">
        <v-card
          v-for="n in [0, 1, 2, 4, 8, 12, 16, 24]"
          :key="n"
          :elevation="n"
          rounded="lg"
          style="width:130px;"
          class="pa-4 text-center"
        >
          <div class="text-subtitle-2 font-weight-bold">{{ n }}</div>
          <div class="text-caption text-medium-emphasis">elevation-{{ n }}</div>
        </v-card>
      </div>
    `,
  }),
}

export const Interactive: Story = {
  name: 'Interactive',
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <v-row>
        <v-col v-for="i in 3" :key="i" cols="12" sm="4">
          <v-card rounded="lg" hover ripple link>
            <v-card-item>
              <template #prepend>
                <v-avatar :color="['primary','secondary','accent'][i-1]" variant="tonal">
                  <v-icon :icon="['mdi-palette','mdi-code-tags','mdi-rocket-launch'][i-1]" />
                </v-avatar>
              </template>
              <v-card-title class="text-subtitle-1">Card {{ i }}</v-card-title>
              <v-card-subtitle>Clicável</v-card-subtitle>
            </v-card-item>
            <v-card-text class="text-body-2">
              Card com <code>hover</code> e <code>ripple</code> ativados.
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    `,
  }),
}
