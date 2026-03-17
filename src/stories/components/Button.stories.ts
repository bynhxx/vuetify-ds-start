import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Components/Button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'text', 'tonal', 'plain'],
      description: 'Variante visual do botão',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'Cor do botão (token semântico)',
    },
    size: {
      control: 'select',
      options: ['x-small', 'small', 'default', 'large', 'x-large'],
      description: 'Tamanho do botão',
    },
    disabled: { control: 'boolean', description: 'Estado desabilitado' },
    loading: { control: 'boolean', description: 'Estado de carregamento' },
    label: { control: 'text', description: 'Texto do botão' },
  },
  args: {
    variant: 'elevated',
    color: 'primary',
    size: 'default',
    disabled: false,
    loading: false,
    label: 'Botão',
  },
  render: (args: Record<string, unknown>) => ({
    setup: () => ({ args }),
    template: `
      <v-btn
        :variant="args.variant"
        :color="args.color"
        :size="args.size"
        :disabled="args.disabled"
        :loading="args.loading"
      >{{ args.label }}</v-btn>
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
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center;">
        <v-btn variant="elevated" color="primary">Elevated</v-btn>
        <v-btn variant="outlined" color="primary">Outlined</v-btn>
        <v-btn variant="text"     color="primary">Text</v-btn>
        <v-btn variant="tonal"    color="primary">Tonal</v-btn>
        <v-btn variant="plain"    color="primary">Plain</v-btn>
      </div>
    `,
  }),
}

export const Colors: Story = {
  name: 'Colors',
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div>
        <div class="text-caption text-medium-emphasis mb-3">Elevated</div>
        <div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px;">
          <v-btn color="primary">Primary</v-btn>
          <v-btn color="secondary">Secondary</v-btn>
          <v-btn color="success">Success</v-btn>
          <v-btn color="warning">Warning</v-btn>
          <v-btn color="error">Error</v-btn>
          <v-btn color="info">Info</v-btn>
        </div>
        <div class="text-caption text-medium-emphasis mb-3">Tonal</div>
        <div style="display:flex;flex-wrap:wrap;gap:10px;">
          <v-btn variant="tonal" color="primary">Primary</v-btn>
          <v-btn variant="tonal" color="secondary">Secondary</v-btn>
          <v-btn variant="tonal" color="success">Success</v-btn>
          <v-btn variant="tonal" color="warning">Warning</v-btn>
          <v-btn variant="tonal" color="error">Error</v-btn>
          <v-btn variant="tonal" color="info">Info</v-btn>
        </div>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  name: 'Sizes',
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display:flex;align-items:center;flex-wrap:wrap;gap:12px;">
        <v-btn size="x-small" color="primary">X-Small</v-btn>
        <v-btn size="small"   color="primary">Small</v-btn>
        <v-btn size="default" color="primary">Default</v-btn>
        <v-btn size="large"   color="primary">Large</v-btn>
        <v-btn size="x-large" color="primary">X-Large</v-btn>
      </div>
    `,
  }),
}

export const WithIcons: Story = {
  name: 'With Icons',
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center;">
        <v-btn color="primary" prepend-icon="mdi-plus">Adicionar</v-btn>
        <v-btn color="error"   prepend-icon="mdi-delete">Excluir</v-btn>
        <v-btn color="secondary" append-icon="mdi-arrow-right">Próximo</v-btn>
        <v-btn color="primary" icon="mdi-heart" variant="tonal" />
        <v-btn color="primary" icon="mdi-magnify" variant="outlined" />
      </div>
    `,
  }),
}

export const States: Story = {
  name: 'States',
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center;">
        <v-btn color="primary">Normal</v-btn>
        <v-btn color="primary" disabled>Disabled</v-btn>
        <v-btn color="primary" loading>Loading</v-btn>
        <v-btn color="primary" variant="outlined" disabled>Outlined Disabled</v-btn>
        <v-btn color="primary" variant="tonal"    loading>Tonal Loading</v-btn>
      </div>
    `,
  }),
}
