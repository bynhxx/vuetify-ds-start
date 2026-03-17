/**
 * Design Token — Espaçamento
 *
 * Base: 4px grid (alinhado com $spacer do Vuetify 3)
 * Escala: multiplicadores 0–24 (subconjunto dos 16 passos do Vuetify)
 * Classes utilitárias Vuetify: ma-{n}, pa-{n}, ga-{n}
 */

const BASE_PX = 4

function px(multiplier: number) {
  return `${BASE_PX * multiplier}px`
}

function rem(multiplier: number) {
  // base: 1rem = 16px
  return multiplier === 0 ? '0rem' : `${(BASE_PX * multiplier) / 16}rem`
}

/** Multiplicadores da escala (espelham os passos-chave do Vuetify) */
const SCALE = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24] as const
type ScaleStep = (typeof SCALE)[number]

function buildScale<T>(fn: (n: number) => T): Record<ScaleStep, T> {
  return Object.fromEntries(SCALE.map((n) => [n, fn(n)])) as Record<ScaleStep, T>
}

export const spacingTokens = {
  /** Multiplicador base: 1 = 4px */
  base: BASE_PX,

  /** Valores em pixels: spacing.px[4] === '16px' */
  px: buildScale(px),

  /** Valores em rem: spacing.rem[4] === '1rem' */
  rem: buildScale(rem),

  /**
   * Aliases semânticos (compostos derivados da escala)
   * Usar esses em vez de valores hardcoded.
   */
  semantic: {
    none:   px(0),  // 0px
    xs:     px(1),  // 4px
    sm:     px(2),  // 8px
    md:     px(4),  // 16px
    lg:     px(6),  // 24px
    xl:     px(8),  // 32px
    '2xl':  px(12), // 48px
    '3xl':  px(16), // 64px
  },

  /**
   * Grid
   * Alinhados com as variáveis SCSS derivadas de $spacer no Vuetify
   */
  grid: {
    gutter:         px(6),  // $grid-gutter       = 24px
    formGutter:     px(2),  // $form-grid-gutter  = 8px
    containerX:     px(4),  // $container-padding-x = 16px
  },
} as const

export type SpacingTokens = typeof spacingTokens
