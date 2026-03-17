import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta = {
  title: 'Components/Alert',
  argTypes: {
    type:     { control: 'select', options: ['success', 'warning', 'error', 'info'] },
    variant:  { control: 'select', options: ['tonal', 'outlined', 'elevated', 'flat', 'text'] },
    title:    { control: 'text' },
    text:     { control: 'text' },
    closable: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    type:     'info',
    variant:  'tonal',
    title:    '',
    text:     'Este é um alerta informativo.',
    closable: false,
  },
  render: (args) => ({
    setup() {
      return {
        type:     String(args.type    ?? 'info'),
        variant:  String(args.variant ?? 'tonal'),
        title:    args.title   ? String(args.title)  : undefined,
        text:     String(args.text    ?? ''),
        closable: Boolean(args.closable),
      }
    },
    template: `
      <v-alert
        :type="type"
        :variant="variant"
        :title="title"
        :text="text"
        :closable="closable"
      />
    `,
  }),
}

export const Types: Story = {
  name: 'Types',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <v-alert type="success" variant="tonal" text="Operação realizada com sucesso." />
        <v-alert type="warning" variant="tonal" text="Atenção: esta ação não pode ser desfeita." />
        <v-alert type="error"   variant="tonal" text="Ocorreu um erro ao processar a solicitação." />
        <v-alert type="info"    variant="tonal" text="Saiba mais sobre as novas funcionalidades." />
      </div>
    `,
  }),
}

export const Variants: Story = {
  name: 'Variants',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <v-alert type="info" variant="tonal"    text="variant: tonal" />
        <v-alert type="info" variant="outlined" text="variant: outlined" />
        <v-alert type="info" variant="elevated" text="variant: elevated" />
        <v-alert type="info" variant="flat"     text="variant: flat" />
        <v-alert type="info" variant="text"     text="variant: text" />
      </div>
    `,
  }),
}

export const WithTitle: Story = {
  name: 'With Title',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <v-alert type="success" variant="tonal"
          title="Conta criada com sucesso"
          text="Verifique sua caixa de entrada para confirmar o e-mail." />
        <v-alert type="warning" variant="tonal"
          title="Sessão expirando"
          text="Sua sessão expirará em 5 minutos. Salve seu trabalho." />
        <v-alert type="error" variant="outlined"
          title="Falha na conexão"
          text="Não foi possível conectar ao servidor. Tente novamente." />
      </div>
    `,
  }),
}

export const WithActions: Story = {
  name: 'With Actions',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <v-alert type="warning" variant="tonal" closable
          title="Atualização disponível"
          text="Uma nova versão está disponível."
        >
          <template #append>
            <v-btn variant="text" color="warning" size="small">Atualizar</v-btn>
          </template>
        </v-alert>
        <v-alert type="info" variant="tonal" closable
          text="Bem-vindo ao Design System. Explore os tokens e componentes." />
      </div>
    `,
  }),
}

export const CustomIcon: Story = {
  name: 'Custom Icon',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <v-alert type="info"    variant="tonal" icon="mdi-lightbulb-outline"
          text="Dica: use tokens semânticos para manter consistência visual." />
        <v-alert type="success" variant="tonal" icon="mdi-check-circle"
          text="Tokens sincronizados com o Figma via Tokens Studio." />
        <v-alert type="warning" variant="tonal" :icon="false"
          text="Alerta sem ícone — :icon=false remove o ícone padrão." />
      </div>
    `,
  }),
}
