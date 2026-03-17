# Vuetify 3 — Auditoria de Tokens Implícitos

> Fase 1 do repositório `vuetify-ds-starter`.
> Versão auditada: **Vuetify 3.12.3**
> Fonte primária: `node_modules/vuetify/lib/composables/theme.js` + `node_modules/vuetify/lib/styles/settings/_variables.scss` + `_colors.scss` + `_elevations.scss`

---

## 1. Estado atual de `plugins/vuetify.ts`

### O que está configurado

| Propriedade | Valor | Observação |
|---|---|---|
| `defaultTheme` | `'light'` | OK |
| `light.colors.primary` | `#1867C0` | Diverge do default Vuetify (`#1867C0`) — coincide |
| `light.colors.secondary` | `#5CBBF6` | Diverge do default Vuetify (`#48A9A6`) |
| `light.colors.surface` | `#FFFFFF` | Coincide com o default |
| `light.colors.background` | `#F5F5F5` | Diverge do default Vuetify (`#FFFFFF`) |
| `light.colors.error` | `#B00020` | Coincide |
| `light.colors.info` | `#2196F3` | Coincide |
| `light.colors.success` | `#4CAF50` | Coincide |
| `light.colors.warning` | `#FB8C00` | Coincide |
| `icons.defaultSet` | `'mdi'` | OK |

### O que está **ausente** (implícito — Vuetify preenche com defaults)

Estas chaves existem no tema padrão interno do Vuetify mas **não foram declaradas** no arquivo:

```
// Tokens de superfície ausentes (light)
'surface-bright':    '#FFFFFF'
'surface-light':     '#EEEEEE'
'surface-variant':   '#424242'
'on-surface-variant':'#EEEEEE'
'primary-darken-1':  '#1F5592'
'secondary-darken-1':'#018786'

// Tokens de superfície ausentes (dark)
'surface-bright':    '#ccbfd6'
'surface-light':     '#424242'
'surface-variant':   '#c8c8c8'
'on-surface-variant':'#000000'
'primary-darken-1':  '#277CC1'
'secondary-darken-1':'#48A9A6'
```

### O que está **ausente** — seção `variables`

O Vuetify injeta automaticamente as seguintes CSS custom properties por tema. Não estão expostas no arquivo atual mas são geradas em runtime:

```
// light theme variables (defaults)
--v-border-color:             0, 0, 0         (RGB de #000000)
--v-border-opacity:           0.12
--v-high-emphasis-opacity:    0.87
--v-medium-emphasis-opacity:  0.60
--v-disabled-opacity:         0.38
--v-idle-opacity:             0.04
--v-hover-opacity:            0.04
--v-focus-opacity:            0.12
--v-selected-opacity:         0.08
--v-activated-opacity:        0.12
--v-pressed-opacity:          0.12
--v-dragged-opacity:          0.08
--v-theme-kbd:                238, 238, 238
--v-theme-on-kbd:             0, 0, 0
--v-theme-code:               245, 245, 245
--v-theme-on-code:            0, 0, 0

// dark theme variables (defaults)
--v-border-color:             255, 255, 255   (RGB de #FFFFFF)
--v-high-emphasis-opacity:    1
--v-medium-emphasis-opacity:  0.70
--v-disabled-opacity:         0.50
--v-idle-opacity:             0.10
--v-pressed-opacity:          0.16
```

### O que está **ausente** — sistema de `variations`

O sistema de variações (lighten/darken automáticos) não está ativado:

```ts
// ausente — gera --v-theme-primary-lighten-1, -lighten-2, etc.
variations: {
  colors: ['primary', 'secondary', 'error'],
  lighten: 3,
  darken: 3,
}
```

---

## 2. Sistema de Cores

### 2.1 Como o Vuetify gera CSS custom properties

O engine de temas (`composables/theme.js → genCssVariables`) converte cada cor do objeto `colors` em **RGB fracionado**, não em hex:

```css
/* gerado automaticamente em runtime, injetado em <style> */
.v-theme--light {
  --v-theme-primary:            24, 103, 192;
  --v-theme-primary-overlay-multiplier: 1;
  --v-theme-secondary:          72, 169, 166;
  --v-theme-surface:            255, 255, 255;
  --v-theme-background:         255, 255, 255;
  --v-theme-error:              176, 0, 32;
  --v-theme-on-primary:         255, 255, 255;
  --v-theme-on-secondary:       0, 0, 0;
  /* ... um token `on-*` para cada cor */
}
```

Os componentes Vuetify consomem essas variáveis assim:

```css
/* padrão interno dos componentes */
background-color: rgb(var(--v-theme-primary));
color:            rgb(var(--v-theme-on-primary));
```

### 2.2 Paleta semântica (semantic tokens)

| Token | Light default | Dark default | Descrição |
|---|---|---|---|
| `primary` | `#1867C0` | `#2196F3` | Cor de ação principal |
| `primary-darken-1` | `#1F5592` | `#277CC1` | Variante escura do primary |
| `secondary` | `#48A9A6` | `#54B6B2` | Cor de ação secundária |
| `secondary-darken-1` | `#018786` | `#48A9A6` | Variante escura do secondary |
| `error` | `#B00020` | `#CF6679` | Estado de erro |
| `info` | `#2196F3` | `#2196F3` | Estado informativo |
| `success` | `#4CAF50` | `#4CAF50` | Estado de sucesso |
| `warning` | `#FB8C00` | `#FB8C00` | Estado de alerta |

### 2.3 Tokens de superfície

| Token | Light default | Dark default | Uso |
|---|---|---|---|
| `background` | `#FFFFFF` | `#121212` | Fundo da página (body) |
| `surface` | `#FFFFFF` | `#212121` | Cards, dialogs, sheets |
| `surface-bright` | `#FFFFFF` | `#ccbfd6` | Superfícies elevadas/destacadas |
| `surface-light` | `#EEEEEE` | `#424242` | Superfícies sutis |
| `surface-variant` | `#424242` | `#c8c8c8` | Superfície alternativa (chips, etc.) |
| `on-surface-variant` | `#EEEEEE` | `#000000` | Texto sobre surface-variant |

### 2.4 Tokens `on-*` (auto-gerados)

Para **cada cor que não começa com `on-`**, o Vuetify calcula automaticamente um `on-{color}` via função `getForeground()` (baseado em luminância — WCAG):

```
on-primary, on-secondary, on-error, on-info, on-success, on-warning,
on-surface, on-background, on-surface-bright, on-surface-light,
on-primary-darken-1, on-secondary-darken-1, ...
```

> ⚠️ Se você declarar um `on-primary` manualmente no objeto `colors`, o Vuetify **usa o seu valor** e para de calcular automaticamente.

### 2.5 Paleta Material Design (color pack SCSS)

Disponível via `$color-pack: true` (default). Gera classes utilitárias como `.bg-blue-lighten-3`, `.text-red-darken-2`.

Cores disponíveis: red, pink, purple, deep-purple, indigo, blue, light-blue, cyan, teal, green, light-green, lime, yellow, amber, orange, deep-orange, brown, blue-grey, grey.
Cada cor tem: `base`, `lighten-1..5`, `darken-1..4`, `accent-1..4`.

> ⚠️ Estas NÃO são tokens do tema. São classes CSS estáticas e não mudam com light/dark.

---

## 3. Sistema de Tipografia

### 3.1 Escala completa (fonte padrão: Roboto)

| Token | Size | Weight | Line-height | Letter-spacing | Transform |
|---|---|---|---|---|---|
| `h1` | 6rem | 300 | 1 | -0.015625em | none |
| `h2` | 3.75rem | 300 | 1 | -0.008333em | none |
| `h3` | 3rem | 400 | 1.05 | normal | none |
| `h4` | 2.125rem | 400 | 1.175 | 0.007353em | none |
| `h5` | 1.5rem | 400 | 1.333 | normal | none |
| `h6` | 1.25rem | 500 | 1.6 | 0.0125em | none |
| `subtitle-1` | 1rem | 400 | 1.75 | 0.009375em | none |
| `subtitle-2` | 0.875rem | 500 | 1.6 | 0.007143em | none |
| `body-1` | 1rem | 400 | 1.5 | 0.03125em | none |
| `body-2` | 0.875rem | 400 | 1.425 | 0.017857em | none |
| `button` | 0.875rem | 500 | 2.6 | 0.089286em | **uppercase** |
| `caption` | 0.75rem | 400 | 1.667 | 0.033333em | none |
| `overline` | 0.75rem | 500 | 2.667 | 0.166667em | **uppercase** |

### 3.2 Variáveis SCSS raiz

```scss
$body-font-family:    'Roboto', sans-serif;
$heading-font-family: $body-font-family;    // herda body
$font-size-root:      1rem;
$line-height-root:    1.5;
```

### 3.3 Font weights disponíveis

```
thin: 100 | light: 300 | regular: 400 | medium: 500 | semibold: 600 | bold: 700 | black: 900
```

Geram classes utilitárias `.font-weight-thin`, `.font-weight-bold`, etc.

---

## 4. Sistema de Espaçamento

### 4.1 Base e escala

```scss
$spacer:       4px;         // unidade base — NÃO alterar diretamente
$spacers-steps: 16;         // gera de 0 a 16
```

Escala gerada (0 a 16):

| Token | Valor px |
|---|---|
| 0 | 0px |
| 1 | 4px |
| 2 | 8px |
| 3 | 12px |
| 4 | 16px |
| 5 | 20px |
| 6 | 24px |
| 8 | 32px |
| 10 | 40px |
| 12 | 48px |
| 16 | 64px |

### 4.2 Classes utilitárias geradas

```
ma-{n}, mt-{n}, mr-{n}, mb-{n}, ml-{n}, mx-{n}, my-{n}  → margin
pa-{n}, pt-{n}, pr-{n}, pb-{n}, pl-{n}, px-{n}, py-{n}  → padding
ga-{n}                                                    → gap (grid)
```

Negativos: `ma-n1` até `ma-n16`.

### 4.3 Grid gutters derivados de `$spacer`

```scss
$grid-gutter:          $spacer * 6   = 24px  (gutter padrão do v-row)
$form-grid-gutter:     $spacer * 2   = 8px
$container-padding-x:  $spacer * 4   = 16px
```

---

## 5. Sistema de Border Radius

### 5.1 Escala gerada a partir de `$border-radius-root`

```scss
$border-radius-root: 4px;
```

| Classe `rounded-*` | Valor calculado | Equivalente |
|---|---|---|
| `rounded-0` | 0 | sem arredondamento |
| `rounded-sm` | `4px * 0.5 = 2px` | |
| `rounded` | `4px` | default |
| `rounded-lg` | `4px * 2 = 8px` | |
| `rounded-xl` | `4px * 6 = 24px` | |
| `rounded-pill` | `9999px` | cápsula |
| `rounded-circle` | `50%` | círculo |
| `rounded-shaped` | `24px 0` | shaped (top-left + bottom-right) |

### 5.2 Prop `rounded` nos componentes

Todos os componentes Vuetify aceitam a prop `rounded` com esses valores: `0 | sm | (default) | lg | xl | pill | circle | shaped`.

---

## 6. Sistema de Elevação

### 6.1 Estrutura

O Vuetify usa **3 camadas de sombra** por nível (Material Design):

```scss
$shadow-key-umbra-opacity:    var(--v-shadow-key-umbra-opacity,    rgba(0,0,0,0.2))
$shadow-key-penumbra-opacity: var(--v-shadow-key-penumbra-opacity, rgba(0,0,0,0.14))
$shadow-key-ambient-opacity:  var(--v-shadow-key-ambient-opacity,  rgba(0,0,0,0.12))
```

### 6.2 Níveis relevantes (0–24)

| Nível | Componente típico | Sombra umbra |
|---|---|---|
| 0 | Flat, texto | `0px 0px 0px 0px` |
| 1 | v-card padrão | `0px 2px 1px -1px` |
| 2 | v-btn elevado | `0px 3px 1px -2px` |
| 4 | v-app-bar | `0px 2px 4px -1px` |
| 6 | v-navigation-drawer | `0px 3px 5px -1px` |
| 8 | v-dialog | `0px 5px 5px -3px` |
| 12 | v-menu | `0px 7px 8px -4px` |
| 16 | v-tooltip avançado | `0px 8px 10px -5px` |
| 24 | v-dialog fullscreen | `0px 11px 15px -7px` |

---

## 7. Sistema de Breakpoints

### 7.1 Grid breakpoints padrão

| Nome | Min-width | Faixa |
|---|---|---|
| `xs` | 0px | < 600px |
| `sm` | 600px | 600–959px |
| `md` | 960px | 960–1279px |
| `lg` | 1280px | 1280–1919px |
| `xl` | 1920px | 1920–2559px |
| `xxl` | 2560px | ≥ 2560px |

### 7.2 Container max-widths derivados

```scss
md:  960px  * 0.9375 = 900px
lg:  1280px * 0.9375 = 1200px
xl:  1920px * 0.9375 = 1800px
xxl: 2560px * 0.9375 = 2400px
```

### 7.3 Display breakpoints (media queries geradas)

```scss
'xs':          '(max-width: 599.98px)'
'sm':          '(min-width: 600px) and (max-width: 959.98px)'
'sm-and-up':   '(min-width: 600px)'
'md-and-up':   '(min-width: 960px)'
'lg-and-up':   '(min-width: 1280px)'
```

---

## 8. Pontos de Override Seguros

### 8.1 Cores

| Onde fazer override | Como | Risco |
|---|---|---|
| ✅ `createVuetify({ theme: { themes: { light: { colors: {} } } } })` | Objeto JS em `plugins/vuetify.ts` | Nenhum — é a API pública |
| ✅ `variables: {}` dentro de cada tema | Opacidades, border-color | Nenhum — API pública |
| ✅ Adicionar cores customizadas (ex.: `brand`, `neutral`) | Mesma posição | Nenhum — tokens extras são permitidos |
| ⚠️ Declarar `on-primary` manualmente | Só se o auto-cálculo não satisfizer o contraste necessário | Desativa o cálculo automático de contraste para aquela cor |
| ❌ Editar `node_modules/vuetify/...` | — | Quebra em qualquer `pnpm install` |

**Recalculado automaticamente pelo Vuetify ao sobrescrever `colors`:**
- Todos os tokens `on-{color}` não declarados explicitamente
- `--v-theme-{color}-overlay-multiplier` (baseado em luminância)
- CSS custom properties `--v-theme-{color}` (em RGB)

### 8.2 Tipografia

| Onde fazer override | Como | Risco |
|---|---|---|
| ✅ SCSS via `src/styles/settings.scss` | `$body-font-family: 'Inter', sans-serif` | Nenhum — arquivo de override dedicado |
| ✅ SCSS `$typography` map | Override de size/weight/line-height por nível | Nenhum |
| ✅ SCSS `$heading-font-family` | Família separada para headings | Nenhum |
| ⚠️ Global CSS sobre `.text-h1`, `.text-body-1` | Funciona mas não é token-driven | Difícil de escalar/manter |
| ❌ Sobrescrever `$font-size-root` sem ajustar a escala | Quebra proporções relativas (tudo é `rem`) | Alto |

### 8.3 Espaçamento

| Onde fazer override | Como | Risco |
|---|---|---|
| ✅ SCSS `$spacer` | `$spacer: 8px` — muda toda a escala proporcionalmente | Nenhum se feito antes do build |
| ✅ SCSS `$spacers-steps` | Aumentar para 20 se precisar de mais passos | Nenhum |
| ⚠️ Adicionar entradas ao map `$spacers` | Permitido, mas cria inconsistência na escala | Médio |
| ❌ Alterar espaçamentos individualmente sem alterar `$spacer` | Perde a coerência do sistema 4px-grid | Alto |

**Recalculado automaticamente ao sobrescrever `$spacer`:**
- `$grid-gutter`, `$form-grid-gutter`, `$container-padding-x`
- Todos os `$spacers` de 0 a `$spacers-steps`
- Classes `ma-*`, `pa-*`, `ga-*`

### 8.4 Border Radius

| Onde fazer override | Como | Risco |
|---|---|---|
| ✅ SCSS `$border-radius-root` | `$border-radius-root: 8px` — recalcula toda a escala | Nenhum |
| ✅ SCSS map `$rounded` | Override de valores individuais (`'xl': 32px`) | Nenhum |
| ⚠️ CSS direto em componentes | `border-radius: 8px !important` | Perde a escala; difícil manter |

**Recalculado automaticamente ao sobrescrever `$border-radius-root`:**
- `rounded-sm = $border-radius-root * 0.5`
- `rounded-lg = $border-radius-root * 2`
- `rounded-xl = $border-radius-root * 6`
- `rounded-shaped = $border-radius-root * 6 0`

### 8.5 Elevação

| Onde fazer override | Como | Risco |
|---|---|---|
| ✅ CSS custom properties | `--v-shadow-key-umbra-opacity: rgba(0,0,0,0.3)` | Nenhum — API pública |
| ✅ SCSS `$shadow-key-umbra`, `$shadow-key-penumbra`, `$shadow-key-ambient` | Override total das sombras | Nenhum se feito antes do build |
| ⚠️ CSS `box-shadow` direto | Funciona mas não segue o sistema | Difícil manter em 25 níveis |

### 8.6 Breakpoints

| Onde fazer override | Como | Risco |
|---|---|---|
| ✅ `createVuetify({ display: { thresholds: { sm: 640 } } })` | API JavaScript do Vuetify | Nenhum — afeta `useDisplay()` e props responsivas |
| ✅ SCSS `$grid-breakpoints` | Afeta classes utilitárias e o grid | Nenhum se consistente com JS |
| ⚠️ Override só no SCSS sem ajustar o `display` JS | Classes CSS e `useDisplay()` ficam dessincronizados | **Alto** — bug silencioso |

---

## 9. Estratégia recomendada para a Fase 2

### 9.1 Hierarquia de override (ordem de aplicação)

```
1. SCSS variables  →  `src/styles/settings.scss`
   └── $spacer, $border-radius-root, $body-font-family, $typography, $rounded
       ↓ Vuetify recalcula toda a escala derivada

2. Theme object JS  →  `src/plugins/vuetify.ts` (via src/themes/light.ts + dark.ts)
   └── colors, variables (opacidades), variations
       ↓ Vuetify gera CSS custom properties em runtime

3. Style Dictionary  →  `src/tokens/`
   └── Compila tokens de design → CSS custom properties / TS constants / JSON
       ↓ Tokens consumidos pelos arquivos de tema e SCSS
```

### 9.2 Tokens que DEVEM ser criados na Fase 2

**Prioridade 1 — Cores semânticas** (`src/tokens/color.ts`):
- Paleta de marca (brand primary, secondary, neutral, etc.)
- Mapeamento para os slots do Vuetify (`primary`, `secondary`, `error`, `warning`, `info`, `success`)
- Tokens de superfície completos incluindo `surface-bright`, `surface-light`, `surface-variant`
- Tokens `on-*` explícitos apenas onde o cálculo automático não garante WCAG AA

**Prioridade 2 — Espaçamento** (`src/tokens/spacing.ts`):
- Definir se a base é 4px (padrão Vuetify) ou 8px
- Exportar constantes TS para uso programático

**Prioridade 3 — Tipografia** (`src/tokens/typography.ts`):
- Família(s) de fonte escolhida(s)
- Override da escala apenas nos níveis que divergem do Vuetify padrão

**Prioridade 4 — Radius** (`src/tokens/radius.ts`):
- Novo valor de `$border-radius-root` se o DS usar outra base

### 9.3 Tokens que NÃO devem ser duplicados

| Sistema | Motivo |
|---|---|
| Escala `on-*` completa | O Vuetify calcula automaticamente via luminância — só declarar exceções |
| Classes `ma-*`, `pa-*` | São output do `$spacer`; não criar aliases paralelos |
| Shades da Material palette | Usá-las via classes utilitárias, não recriando tokens próprios |
| Breakpoints (só JS) | Configurar uma única vez em `display.thresholds`; não duplicar em SCSS sem sincronizar |
| Elevation 0–24 | O sistema de sombras é completo; customizar apenas as opacidades se necessário |

### 9.4 Atenção crítica: `secondary` diverge do default Vuetify

O `plugins/vuetify.ts` atual define `secondary: '#5CBBF6'` (azul claro) mas o Vuetify default é `#48A9A6` (teal). Isso não é um bug, mas a Fase 2 deve tomar essa decisão explicitamente e registrar o token de marca.

### 9.5 Atenção crítica: `background` foi alterado

`background: '#F5F5F5'` no tema light está definido, mas o token `on-background` gerado automaticamente será calculado sobre `#F5F5F5` (luma alta → texto escuro, OK). Verificar contraste na Fase 2.

### 9.6 Configurar `variations` na Fase 2

Para que o DS tenha variantes de cor consistentes (como `primary-lighten-2` para hover states), adicionar ao tema:

```ts
variations: {
  colors: ['primary', 'secondary', 'error', 'neutral'],
  lighten: 3,
  darken: 3,
}
```

Isso gera CSS custom properties `--v-theme-primary-lighten-1..3` e `--v-theme-primary-darken-1..3` automaticamente.
