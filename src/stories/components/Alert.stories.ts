import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Components/Alert',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'warning', 'error', 'info'],
      description: 'Tipo semântico do alerta',
    },
    variant: {
      control: 'select',
      options: ['tonal', 'outlined', 'elevated', 'flat', 'text'],
      description: 'Variante visual',
    },
    title: { control: 'text', description: 'Título opcional' },
    text: { control: 'text', description: 'Mensagem do alerta' },
    closable: { control: 'boolean', description: 'Mostra botão de fechar' },
    icon: { control: 'text', description: 'Ícone personalizado (mdi-*)' },
  },
  args: {
    type: 'info',
    variant: 'tonal',
    title: '',
    text: 'Este é um alerta informativo. Clique para dispensar.',
    closable: false,
    icon: undefined,
  },
  render: (args: Record<string, unknown>) => ({
    setup: () => ({ args }),
    template: `
      <v-alert
        :type="args.type"
        :variant="args.variant"
        :title="args.title || undefined"
        :text="args.text"
        :closable="args.closable"
        :icon="args.icon || undefined"
      />
    `,
  }),
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Types: Story = {
  name: 'Types',
  parameters: { controls: { disable: true } },
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
  parameters: { controls: { disable: true } },
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
  parameters: { controls: { disable: true } },
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
          text="Não foi possível conectar ao servidor. Tente novamente em instantes." />
      </div>
    `,
  }),
}

export const WithActions: Story = {
  name: 'With Actions',
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <v-alert type="warning" variant="tonal" closable
          title="Atualização disponível"
          text="Uma nova versão está disponível. Atualize para acessar novos recursos."
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
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <v-alert type="info" variant="tonal" icon="mdi-lightbulb-outline"
          text="Dica: use tokens semânticos para manter a consistência visual." />
        <v-alert type="success" variant="tonal" icon="mdi-check-circle"
          text="Dados sincronizados com o Figma via Tokens Studio." />
        <v-alert type="warning" variant="tonal" :icon="false"
          text="Alerta sem ícone — icon=false remove o ícone padrão." />
      </div>
    `,
  }),
}
