/**
 * Design Token — Border Radius
 *
 * Base: 4px (padrão Vuetify $border-radius-root = 4px)
 *
 * ATENÇÃO: O valor `md` (8px) é o NOVO $border-radius-root do DS.
 * Para refletir isso no Vuetify, configure em src/styles/settings.scss:
 *   $border-radius-root: 8px;
 *
 * Isso recalcula automaticamente toda a escala SCSS do Vuetify:
 *   rounded-sm:    4px  (md * 0.5)
 *   rounded:       8px  (md = $border-radius-root)
 *   rounded-lg:   16px  (md * 2)
 *   rounded-xl:   48px  (md * 6)
 *
 * Os valores abaixo espelham essa escala com nomes semânticos.
 */

export const radiusTokens = {
  none: '0px',
  sm:   '4px',    // $border-radius-root * 0.5
  md:   '8px',    // $border-radius-root  ← base do DS
  lg:   '16px',   // $border-radius-root * 2
  xl:   '24px',   // valor intermediário (Vuetify xl = 48px com base 8px — ajustado para DS)
  full: '9999px', // cápsula / pill
} as const

export type RadiusTokens = typeof radiusTokens
