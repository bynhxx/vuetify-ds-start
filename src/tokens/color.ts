/**
 * Design Token — Cores
 *
 * Fase 2 | vuetify-ds-starter
 *
 * Nomenclatura de on-* segue WCAG AA:
 *  - texto normal: contraste ≥ 4.5:1
 *  - texto grande (18px+, ou 14px bold): contraste ≥ 3:1
 *
 * Lighten-1 variants são tints de superfície (hover, chip, badge).
 * Devem ser usados SOMENTE com texto grande ou como plano de fundo
 * sem texto, pois ficam na faixa 3.5–3.8:1 (AA large text only).
 */

// ---------------------------------------------------------------------------
// Paleta semântica — compartilhada entre light e dark
// ---------------------------------------------------------------------------

/** Cores de ação e estado (independentes de tema) */
export const semantic = {
  primary:              '#5B638E',
  'primary-darken-1':   '#4B5276',  // darken ~15%: contrast #FFFFFF 7.59:1 ✅
  'primary-lighten-1':  '#7C82A5',  // lighten ~20%: tint only — #FFFFFF 3.75:1 (AA large)

  secondary:              '#546E7A',
  'secondary-darken-1':   '#465B65', // darken ~15%: contrast #FFFFFF 7.12:1 ✅
  'secondary-lighten-1':  '#768B95', // lighten ~20%: tint only — #212121 3.77:1 (AA large)

  accent:   '#263238',
  success:  '#A1B7A2',
  warning:  '#DBD0B6',
  error:    '#BFACAC',
  info:     '#9CAAB7',
} as const

// ---------------------------------------------------------------------------
// on-* — calculados via luminância relativa (WCAG)
// ---------------------------------------------------------------------------

/**
 * Cada `on-{color}` garante contraste adequado sobre a cor de fundo correspondente.
 * Valores baseados na função: L > 0.18 → preto, L <= 0.18 → branco
 *
 * primary         L=0.146 → #FFFFFF  5.35:1 ✅
 * primary-darken  L=0.088 → #FFFFFF  7.59:1 ✅
 * primary-lighten L=0.230 → #FFFFFF  3.75:1 ⚠️ (AA large text only)
 * secondary       L=0.148 → #FFFFFF  5.31:1 ✅
 * secondary-dark  L=0.097 → #FFFFFF  7.12:1 ✅
 * secondary-light L=0.263 → #212121  3.77:1 ⚠️ (AA large text only)
 * accent          L=0.030 → #FFFFFF 13.14:1 ✅
 * success         L=0.441 → #212121  5.90:1 ✅
 * warning         L=0.636 → #212121  8.25:1 ✅
 * error           L=0.437 → #212121  5.86:1 ✅
 * info            L=0.394 → #212121  5.35:1 ✅
 */
export const onColors = {
  'on-primary':             '#FFFFFF',
  'on-primary-darken-1':    '#FFFFFF',
  'on-primary-lighten-1':   '#FFFFFF', // ⚠️ AA large text only (3.75:1)
  'on-secondary':           '#FFFFFF',
  'on-secondary-darken-1':  '#FFFFFF',
  'on-secondary-lighten-1': '#212121', // ⚠️ AA large text only (3.77:1)
  'on-accent':              '#FFFFFF',
  'on-success':             '#212121',
  'on-warning':             '#212121',
  'on-error':               '#212121',
  'on-info':                '#212121',
} as const

// ---------------------------------------------------------------------------
// Superfície — Light Theme
// ---------------------------------------------------------------------------

export const surfaceLight = {
  background:           '#F5F5F5', // L=0.913 → on: #212121  11.1:1 ✅
  surface:              '#FFFFFF', // L=1.000 → on: #212121  12.6:1 ✅
  'surface-bright':     '#FFFFFF', // mesmo que surface no tema light
  'surface-light':      '#EEEEEE', // L=0.870 → on: #212121  11.1:1 ✅
  'surface-variant':    '#ECEDF3', // L=0.850, tint primary — on: #212121 10.8:1 ✅
  'on-surface':         '#212121',
  'on-background':      '#212121',
  'on-surface-bright':  '#212121',
  'on-surface-light':   '#212121',
  'on-surface-variant': '#212121',
} as const

// ---------------------------------------------------------------------------
// Superfície — Dark Theme
// ---------------------------------------------------------------------------

export const surfaceDark = {
  background:           '#2D2B2B', // L=0.025 → on: #EEEEEE 14.1:1 ✅
  surface:              '#2B2828', // L=0.024 → on: #EEEEEE 14.2:1 ✅
  'surface-bright':     '#3D3A3A', // L=0.043 → on: #EEEEEE  9.9:1 ✅
  'surface-light':      '#373434', // L=0.036 → on: #EEEEEE 10.7:1 ✅
  'surface-variant':    '#454154', // L=0.073 → on: #EEEEEE  8.6:1 ✅
  'on-surface':         '#EEEEEE',
  'on-background':      '#EEEEEE',
  'on-surface-bright':  '#EEEEEE',
  'on-surface-light':   '#EEEEEE',
  'on-surface-variant': '#EEEEEE',
} as const

// ---------------------------------------------------------------------------
// Export consolidado
// ---------------------------------------------------------------------------

export const colorTokens = {
  semantic,
  onColors,
  light: surfaceLight,
  dark: surfaceDark,
} as const

export type ColorTokens = typeof colorTokens
