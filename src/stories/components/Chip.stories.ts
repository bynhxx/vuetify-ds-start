import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Components/Chip',
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'Cor semântica',
    },
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'tonal', 'flat', 'text'],
      description: 'Variante visual',
    },
    size: {
      control: 'select',
      options: ['x-small', 'small', 'default', 'large'],
    },
    closable: { control: 'boolean', description: 'Mostra botão de fechar' },
    disabled: { control: 'boolean' },
    label: { control: 'text', description: 'Texto do chip' },
    prependIcon: { control: 'text', description: 'Ícone prepend (mdi-*)' },
  },
  args: {
    color: 'primary',
    variant: 'tonal',
    size: 'default',
    closable: false,
    disabled: false,
    label: 'Chip',
    prependIcon: '',
  },
  render: (args: Record<string, unknown>) => ({
    setup: () => ({ args }),
    template: `
      <v-chip
        :color="args.color"
        :variant="args.variant"
        :size="args.size"
        :closable="args.closable"
        :disabled="args.disabled"
        :prepend-icon="args.prependIcon || undefined"
      >{{ args.label }}</v-chip>
    `,
  }),
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Colors: Story = {
  name: 'Colors',
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div>
        <div class="text-caption text-medium-emphasis mb-3">Tonal</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;">
          <v-chip variant="tonal" color="primary">Primary</v-chip>
          <v-chip variant="tonal" color="secondary">Secondary</v-chip>
          <v-chip variant="tonal" color="success">Success</v-chip>
          <v-chip variant="tonal" color="warning">Warning</v-chip>
          <v-chip variant="tonal" color="error">Error</v-chip>
          <v-chip variant="tonal" color="info">Info</v-chip>
        </div>
        <div class="text-caption text-medium-emphasis mb-3">Elevated</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;">
          <v-chip color="primary">Primary</v-chip>
          <v-chip color="secondary">Secondary</v-chip>
          <v-chip color="success">Success</v-chip>
          <v-chip color="warning">Warning</v-chip>
          <v-chip color="error">Error</v-chip>
          <v-chip color="info">Info</v-chip>
        </div>
        <div class="text-caption text-medium-emphasis mb-3">Outlined</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          <v-chip variant="outlined" color="primary">Primary</v-chip>
          <v-chip variant="outlined" color="secondary">Secondary</v-chip>
          <v-chip variant="outlined" color="success">Success</v-chip>
          <v-chip variant="outlined" color="warning">Warning</v-chip>
          <v-chip variant="outlined" color="error">Error</v-chip>
          <v-chip variant="outlined" color="info">Info</v-chip>
        </div>
      </div>
    `,
  }),
}

export const WithIcons: Story = {
  name: 'With Icons',
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:8px;">
        <v-chip color="primary" prepend-icon="mdi-account">Perfil</v-chip>
        <v-chip color="success" prepend-icon="mdi-check-circle" variant="tonal">Aprovado</v-chip>
        <v-chip color="error"   prepend-icon="mdi-alert-circle" variant="tonal">Erro</v-chip>
        <v-chip color="warning" prepend-icon="mdi-clock-outline" variant="tonal">Pendente</v-chip>
        <v-chip color="info"    prepend-icon="mdi-information"  variant="outlined">Info</v-chip>
        <v-chip color="secondary" append-icon="mdi-chevron-down" variant="tonal">Dropdown</v-chip>
      </div>
    `,
  }),
}

export const Closable: Story = {
  name: 'Closable',
  parameters: { controls: { disable: true } },
  render: () => ({
    data() {
      return {
        chips: [
          { label: 'Vue 3', color: 'primary' },
          { label: 'Vuetify', color: 'secondary' },
          { label: 'TypeScript', color: 'info' },
          { label: 'Vite', color: 'success' },
        ],
      }
    },
    methods: {
      remove(i: number) { (this as any).chips.splice(i, 1) },
    },
    template: `
      <div>
        <div class="text-caption text-medium-emphasis mb-3">Clique no × para remover</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          <v-chip
            v-for="(chip, i) in chips"
            :key="chip.label"
            :color="chip.color"
            variant="tonal"
            closable
            @click:close="remove(i)"
          >{{ chip.label }}</v-chip>
        </div>
        <div v-if="chips.length === 0" class="text-caption text-medium-emphasis mt-4">
          Todos os chips foram removidos.
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
        <v-chip size="x-small" color="primary" variant="tonal">X-Small</v-chip>
        <v-chip size="small"   color="primary" variant="tonal">Small</v-chip>
        <v-chip size="default" color="primary" variant="tonal">Default</v-chip>
        <v-chip size="large"   color="primary" variant="tonal">Large</v-chip>
      </div>
    `,
  }),
}

export const AsFilters: Story = {
  name: 'As Filters',
  parameters: { controls: { disable: true } },
  render: () => ({
    data() {
      return {
        filters: [
          { label: 'Todos', active: true },
          { label: 'Cores', active: false },
          { label: 'Tipografia', active: false },
          { label: 'Espaçamento', active: false },
          { label: 'Componentes', active: false },
        ],
      }
    },
    methods: {
      toggle(i: number) {
        const f = (this as any).filters
        f.forEach((_: unknown, idx: number) => { f[idx].active = idx === i })
      },
    },
    template: `
      <div>
        <div class="text-caption text-medium-emphasis mb-3">Chips como filtros (toggle)</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          <v-chip
            v-for="(f, i) in filters"
            :key="f.label"
            :variant="f.active ? 'elevated' : 'tonal'"
            :color="f.active ? 'primary' : 'default'"
            @click="toggle(i)"
            style="cursor:pointer"
          >{{ f.label }}</v-chip>
        </div>
      </div>
    `,
  }),
}
