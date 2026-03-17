import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta = {
  title: 'Components/Chip',
  argTypes: {
    color:       { control: 'select', options: ['primary','secondary','success','warning','error','info'] },
    variant:     { control: 'select', options: ['elevated','outlined','tonal','flat','text'] },
    size:        { control: 'select', options: ['x-small','small','default','large'] },
    closable:    { control: 'boolean' },
    disabled:    { control: 'boolean' },
    label:       { control: 'text' },
    prependIcon: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    color:       'primary',
    variant:     'tonal',
    size:        'default',
    closable:    false,
    disabled:    false,
    label:       'Chip',
    prependIcon: '',
  },
  render: (args) => ({
    setup() {
      return {
        color:       String(args.color       ?? 'primary'),
        variant:     String(args.variant     ?? 'tonal'),
        size:        String(args.size        ?? 'default'),
        closable:    Boolean(args.closable),
        disabled:    Boolean(args.disabled),
        label:       String(args.label       ?? 'Chip'),
        prependIcon: args.prependIcon ? String(args.prependIcon) : undefined,
      }
    },
    template: `
      <v-chip
        :color="color"
        :variant="variant"
        :size="size"
        :closable="closable"
        :disabled="disabled"
        :prepend-icon="prependIcon"
      >{{ label }}</v-chip>
    `,
  }),
}

export const Colors: Story = {
  name: 'Colors',
  render: () => ({
    template: `
      <div>
        <div style="font-size:11px;opacity:.6;margin-bottom:8px;">Tonal</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;">
          <v-chip variant="tonal" color="primary">Primary</v-chip>
          <v-chip variant="tonal" color="secondary">Secondary</v-chip>
          <v-chip variant="tonal" color="success">Success</v-chip>
          <v-chip variant="tonal" color="warning">Warning</v-chip>
          <v-chip variant="tonal" color="error">Error</v-chip>
          <v-chip variant="tonal" color="info">Info</v-chip>
        </div>
        <div style="font-size:11px;opacity:.6;margin-bottom:8px;">Elevated</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;">
          <v-chip color="primary">Primary</v-chip>
          <v-chip color="secondary">Secondary</v-chip>
          <v-chip color="success">Success</v-chip>
          <v-chip color="warning">Warning</v-chip>
          <v-chip color="error">Error</v-chip>
          <v-chip color="info">Info</v-chip>
        </div>
        <div style="font-size:11px;opacity:.6;margin-bottom:8px;">Outlined</div>
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
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:8px;">
        <v-chip color="primary"   prepend-icon="mdi-account">Perfil</v-chip>
        <v-chip color="success"   prepend-icon="mdi-check-circle"  variant="tonal">Aprovado</v-chip>
        <v-chip color="error"     prepend-icon="mdi-alert-circle"  variant="tonal">Erro</v-chip>
        <v-chip color="warning"   prepend-icon="mdi-clock-outline" variant="tonal">Pendente</v-chip>
        <v-chip color="info"      prepend-icon="mdi-information"   variant="outlined">Info</v-chip>
        <v-chip color="secondary" append-icon="mdi-chevron-down"   variant="tonal">Dropdown</v-chip>
      </div>
    `,
  }),
}

export const Closable: Story = {
  name: 'Closable',
  render: () => ({
    data() {
      return {
        chips: [
          { label: 'Vue 3',       color: 'primary'   },
          { label: 'Vuetify',     color: 'secondary' },
          { label: 'TypeScript',  color: 'info'      },
          { label: 'Vite',        color: 'success'   },
        ],
      }
    },
    methods: {
      remove(i: number) { (this as any).chips.splice(i, 1) },
    },
    template: `
      <div>
        <div style="font-size:11px;opacity:.6;margin-bottom:8px;">
          Clique no × para remover
        </div>
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
        <div v-if="chips.length === 0"
          style="font-size:12px;opacity:.5;margin-top:12px;">
          Todos removidos.
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
  render: () => ({
    data() {
      return {
        active: 0,
        filters: ['Todos','Cores','Tipografia','Espaçamento','Componentes'],
      }
    },
    methods: {
      toggle(i: number) { (this as any).active = i },
    },
    template: `
      <div>
        <div style="font-size:11px;opacity:.6;margin-bottom:8px;">
          Toggle de filtros
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          <v-chip
            v-for="(f, i) in filters"
            :key="f"
            :variant="active === i ? 'elevated' : 'tonal'"
            :color="active === i ? 'primary' : undefined"
            style="cursor:pointer"
            @click="toggle(i)"
          >{{ f }}</v-chip>
        </div>
      </div>
    `,
  }),
}
