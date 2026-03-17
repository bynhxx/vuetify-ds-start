import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta = {
  title: 'Components/Button',
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'text', 'tonal', 'plain'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
    },
    size: {
      control: 'select',
      options: ['x-small', 'small', 'default', 'large', 'x-large'],
    },
    disabled: { control: 'boolean' },
    loading:  { control: 'boolean' },
    label:    { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ── Default — args no nível da story, setup desestrutura individualmente ──────
export const Default: Story = {
  args: {
    variant: 'elevated',
    color:   'primary',
    size:    'default',
    disabled: false,
    loading:  false,
    label:   'Botão',
  },
  render: (args) => ({
    setup() {
      return {
        variant:  String(args.variant  ?? 'elevated'),
        color:    String(args.color    ?? 'primary'),
        size:     String(args.size     ?? 'default'),
        disabled: Boolean(args.disabled),
        loading:  Boolean(args.loading),
        label:    String(args.label    ?? 'Botão'),
      }
    },
    template: `
      <v-btn
        :variant="variant"
        :color="color"
        :size="size"
        :disabled="disabled"
        :loading="loading"
      >{{ label }}</v-btn>
    `,
  }),
}

// ── Stories estáticas — sem args, sem closure de objeto ───────────────────────

export const Variants: Story = {
  name: 'Variants',
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
  render: () => ({
    template: `
      <div>
        <div style="font-size:11px;opacity:.6;margin-bottom:8px;">Elevated</div>
        <div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px;">
          <v-btn color="primary">Primary</v-btn>
          <v-btn color="secondary">Secondary</v-btn>
          <v-btn color="success">Success</v-btn>
          <v-btn color="warning">Warning</v-btn>
          <v-btn color="error">Error</v-btn>
          <v-btn color="info">Info</v-btn>
        </div>
        <div style="font-size:11px;opacity:.6;margin-bottom:8px;">Tonal</div>
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
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center;">
        <v-btn color="primary"    prepend-icon="mdi-plus">Adicionar</v-btn>
        <v-btn color="error"      prepend-icon="mdi-delete">Excluir</v-btn>
        <v-btn color="secondary"  append-icon="mdi-arrow-right">Próximo</v-btn>
        <v-btn color="primary"    icon="mdi-heart"   variant="tonal" />
        <v-btn color="primary"    icon="mdi-magnify" variant="outlined" />
      </div>
    `,
  }),
}

export const States: Story = {
  name: 'States',
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
