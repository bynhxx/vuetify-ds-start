/**
 * Design Tokens — Índice central
 *
 * Exporte individual para tree-shaking e export consolidado `designTokens`
 * para uso no Style Dictionary e imports convenientes.
 */

export { colorTokens, semantic, onColors, surfaceLight, surfaceDark } from './color'
export type { ColorTokens } from './color'

export { spacingTokens } from './spacing'
export type { SpacingTokens } from './spacing'

export { typographyTokens } from './typography'
export type { TypographyTokens } from './typography'

export { radiusTokens } from './radius'
export type { RadiusTokens } from './radius'

// ---------------------------------------------------------------------------
// Export consolidado
// ---------------------------------------------------------------------------

import { colorTokens } from './color'
import { spacingTokens } from './spacing'
import { typographyTokens } from './typography'
import { radiusTokens } from './radius'

export const designTokens = {
  color:      colorTokens,
  spacing:    spacingTokens,
  typography: typographyTokens,
  radius:     radiusTokens,
} as const

export type DesignTokens = typeof designTokens
