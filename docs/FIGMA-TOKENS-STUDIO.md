# Figma — Tokens Studio: Guia de Importação

Este guia descreve como importar os tokens do Design System no Figma usando o plugin
**Tokens Studio for Figma** (compatível com o plano gratuito).

---

## Pré-requisitos

| Item | Onde obter |
|---|---|
| Plugin **Tokens Studio for Figma** | Figma Community → buscar "Tokens Studio" |
| Arquivo Figma aberto | `figma.com/design/FYtFSlDqNDCy7SYk3AZwK7/...` |
| Tokens compilados | Executar `pnpm tokens:build` na raiz do projeto |

---

## Arquivos gerados por `pnpm tokens:build`

| Arquivo | Conteúdo | Token set (Tokens Studio) |
|---|---|---|
| `src/styles/tokens.global.w3c.json` | Spacing, border-radius, typography scale | `global` |
| `src/styles/tokens.light.w3c.json` | Cores tema claro (semantic + surfaces) | `light` |
| `src/styles/tokens.dark.w3c.json` | Cores tema escuro (semantic + surfaces) | `dark` |
| `src/styles/tokens.studio.config.json` | Metadados + definição de temas | config |

---

## Passo a passo

### 1. Instalar o plugin

1. No Figma, abra o menu **Plugins → Browse plugins in Community**
2. Busque **"Tokens Studio for Figma"**
3. Clique em **Install**

---

### 2. Criar os Token Sets

1. Abra o plugin (**Plugins → Tokens Studio for Figma**)
2. No painel esquerdo, clique em **"+" (Add new set)**
3. Crie os três sets na ordem abaixo:

   | Nome do set | Arquivo a importar |
   |---|---|
   | `global` | `tokens.global.w3c.json` |
   | `light` | `tokens.light.w3c.json` |
   | `dark` | `tokens.dark.w3c.json` |

---

### 3. Importar cada JSON

Para cada set:

1. Selecione o set no painel esquerdo
2. Clique no ícone **"..." → Edit JSON**
3. Apague o conteúdo existente
4. Cole o conteúdo do arquivo correspondente (ex.: `tokens.global.w3c.json`)
5. Clique em **Save**

> **Dica**: Use `cat src/styles/tokens.global.w3c.json | pbcopy` no terminal para copiar
> o conteúdo rapidamente (macOS). No Linux: `xclip -selection clipboard < arquivo`.

---

### 4. Configurar os Themes (Light / Dark)

1. No Tokens Studio, acesse a aba **Themes**
2. Clique em **"+ Add theme"** e crie dois temas:

   **Tema Light:**
   - Nome: `Light`
   - `global` → **Enabled**
   - `light` → **Enabled**
   - `dark` → **Disabled**

   **Tema Dark:**
   - Nome: `Dark`
   - `global` → **Enabled**
   - `light` → **Disabled**
   - `dark` → **Enabled**

3. Alterne entre os temas pelo seletor no topo do painel para validar

---

### 5. Aplicar tokens nos componentes

Com os sets ativos, selecione qualquer elemento no Figma e aplique tokens via:

- **Cor de preenchimento** → tokens do grupo `color.*`
- **Espaçamento** (Auto layout padding/gap) → tokens do grupo `spacing.*`
- **Border radius** → tokens do grupo `borderRadius.*`
- **Texto** (tamanho) → tokens do grupo `typography.*`

---

### 6. Sincronização futura (fluxo de atualização)

Sempre que os tokens do código forem alterados:

```bash
# 1. Reconstruir os tokens
pnpm tokens:build

# 2. No Tokens Studio: re-importar os arquivos .w3c.json alterados
#    (repetir o passo 3 apenas para os sets modificados)
```

Para automação futura, o Tokens Studio suporta sync via **GitHub / GitLab / URL remota**
(plano Pro do plugin). Com isso, basta fazer push e o Figma atualiza automaticamente.

---

## Estrutura de tokens

### `global` — agnóstico de tema

```
spacing
  0 → 0px
  1 → 4px       (1 × 4px)
  2 → 8px
  ...
  24 → 96px

borderRadius
  none → 0px
  sm   → 4px
  md   → 8px    ($border-radius-root)
  lg   → 16px
  xl   → 24px
  full → 9999px

typography
  h1 → 96px   (weight: 300 / lh: 1.167)
  h2 → 60px
  ...
  overline → 10px
```

### `light` / `dark` — cores por tema

```
color
  primary             → #5B638E  (Cor de ação principal)
  primary-darken-1    → #4B5276  (hover/pressed — WCAG AA 7.59:1)
  primary-lighten-1   → #7C82A5  (chip/badge — WCAG AA-large 3.75:1)
  secondary           → #546E7A
  accent              → #263238
  success / warning / error / info
  on-primary / on-secondary / on-accent / on-success ...
  background / surface / surface-bright / surface-light / surface-variant
  on-surface / on-background / on-surface-variant
```

---

## Notas

- Os tokens seguem o formato **W3C/DTCG** (`$value`, `$type`, `$description`)
- Tokens Studio ≥ v2 suporta W3C/DTCG nativamente
- As descrições incluem ratios de contraste WCAG para referência rápida no Figma
- O arquivo `tokens.studio.config.json` pode ser importado via **Settings → Themes config**
  para restaurar a configuração de temas automaticamente
