/**
 * Design Token — Tipografia
 *
 * Fonte base: Inter (sans), JetBrains Mono (mono)
 * Escala tipográfica: espelha e substitui a do Vuetify ($typography SCSS map)
 *
 * Diferenças em relação ao Vuetify default:
 *  - fontFamily: Roboto → Inter (sans), adiciona JetBrains Mono (mono)
 *  - Pesos: sem alteração (mantém escala MD)
 *  - Tamanhos e line-heights: mantidos da especificação Material Design 2
 *
 * Para aplicar no Vuetify, configure em src/styles/settings.scss:
 *   $body-font-family: 'Inter', sans-serif;
 *   $heading-font-family: 'Inter', sans-serif;
 */

export const typographyTokens = {
  fontFamily: {
    sans: "'Inter', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },

  fontWeight: {
    light:    300,
    regular:  400,
    medium:   500,
    semibold: 600,
    bold:     700,
  },

  /**
   * Escala tipográfica
   * Cada nível expõe: size, weight, lineHeight, letterSpacing, textTransform
   * Valores de size em rem (root 16px); letter-spacing em em.
   */
  scale: {
    h1: {
      size:          '6rem',        // 96px
      weight:        300,
      lineHeight:    1,
      letterSpacing: '-0.015625em',
      textTransform: 'none',
    },
    h2: {
      size:          '3.75rem',     // 60px
      weight:        300,
      lineHeight:    1,
      letterSpacing: '-0.008333em',
      textTransform: 'none',
    },
    h3: {
      size:          '3rem',        // 48px
      weight:        400,
      lineHeight:    1.05,
      letterSpacing: 'normal',
      textTransform: 'none',
    },
    h4: {
      size:          '2.125rem',    // 34px
      weight:        400,
      lineHeight:    1.175,
      letterSpacing: '0.007353em',
      textTransform: 'none',
    },
    h5: {
      size:          '1.5rem',      // 24px
      weight:        400,
      lineHeight:    1.333,
      letterSpacing: 'normal',
      textTransform: 'none',
    },
    h6: {
      size:          '1.25rem',     // 20px
      weight:        500,
      lineHeight:    1.6,
      letterSpacing: '0.0125em',
      textTransform: 'none',
    },
    subtitle1: {
      size:          '1rem',        // 16px
      weight:        400,
      lineHeight:    1.75,
      letterSpacing: '0.009375em',
      textTransform: 'none',
    },
    subtitle2: {
      size:          '0.875rem',    // 14px
      weight:        500,
      lineHeight:    1.6,
      letterSpacing: '0.007143em',
      textTransform: 'none',
    },
    body1: {
      size:          '1rem',        // 16px
      weight:        400,
      lineHeight:    1.5,
      letterSpacing: '0.03125em',
      textTransform: 'none',
    },
    body2: {
      size:          '0.875rem',    // 14px
      weight:        400,
      lineHeight:    1.425,
      letterSpacing: '0.017857em',
      textTransform: 'none',
    },
    button: {
      size:          '0.875rem',    // 14px
      weight:        500,
      lineHeight:    2.6,
      letterSpacing: '0.089286em',
      textTransform: 'uppercase',
    },
    caption: {
      size:          '0.75rem',     // 12px
      weight:        400,
      lineHeight:    1.667,
      letterSpacing: '0.033333em',
      textTransform: 'none',
    },
    overline: {
      size:          '0.75rem',     // 12px
      weight:        500,
      lineHeight:    2.667,
      letterSpacing: '0.166667em',
      textTransform: 'uppercase',
    },
  },
} as const

export type TypographyTokens = typeof typographyTokens
