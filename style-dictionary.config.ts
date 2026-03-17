/**
 * Style Dictionary v5 — Build de tokens
 *
 * Saídas:
 *  1. src/styles/tokens.css   — CSS custom properties (:root)
 *  2. src/styles/tokens.scss  — SCSS variables ($)
 *  3. src/styles/tokens.json  — JSON flat (referência / Figma)
 *
 * Nomenclatura: --ds-{categoria}-{nome}
 * Execução: pnpm tokens:build  (tsx style-dictionary.config.ts)
 */

import StyleDictionary from 'style-dictionary'
import { colorTokens } from './src/tokens/color.js'
import { spacingTokens } from './src/tokens/spacing.js'
import { typographyTokens } from './src/tokens/typography.js'
import { radiusTokens } from './src/tokens/radius.js'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type SDToken = { $value: string | number; $type?: string; comment?: string }
type SDTree  = { [key: string]: SDToken | SDTree }

function token(value: string | number, type?: string, comment?: string): SDToken {
  return { $value: value, ...(type ? { $type: type } : {}), ...(comment ? { comment } : {}) }
}

// ---------------------------------------------------------------------------
// 1. Color tokens
// ---------------------------------------------------------------------------

const semanticColors: SDTree = Object.fromEntries(
  Object.entries(colorTokens.semantic).map(([k, v]) => [
    k.replace(/-/g, '_'), // primary-darken-1 → primary_darken_1
    token(v, 'color'),
  ])
)

const onColorTokens: SDTree = Object.fromEntries(
  Object.entries(colorTokens.onColors).map(([k, v]) => [
    k.replace(/-/g, '_'), // on-primary → on_primary
    token(v, 'color'),
  ])
)

const lightSurface: SDTree = Object.fromEntries(
  Object.entries(colorTokens.light).map(([k, v]) => [
    `light_${k.replace(/-/g, '_')}`,
    token(v, 'color'),
  ])
)

const darkSurface: SDTree = Object.fromEntries(
  Object.entries(colorTokens.dark).map(([k, v]) => [
    `dark_${k.replace(/-/g, '_')}`,
    token(v, 'color'),
  ])
)

// ---------------------------------------------------------------------------
// 2. Spacing tokens
// ---------------------------------------------------------------------------

const spacingPx: SDTree = Object.fromEntries(
  Object.entries(spacingTokens.px).map(([k, v]) => [
    `s${k}`, token(v, 'dimension'),
  ])
)

// ---------------------------------------------------------------------------
// 3. Typography tokens
// ---------------------------------------------------------------------------

const fontFamily: SDTree = Object.fromEntries(
  Object.entries(typographyTokens.fontFamily).map(([k, v]) => [k, token(v)])
)

const fontWeight: SDTree = Object.fromEntries(
  Object.entries(typographyTokens.fontWeight).map(([k, v]) => [k, token(v)])
)

const fontSize: SDTree = Object.fromEntries(
  Object.entries(typographyTokens.scale).map(([k, v]) => [k, token(v.size, 'dimension')])
)

const lineHeight: SDTree = Object.fromEntries(
  Object.entries(typographyTokens.scale).map(([k, v]) => [k, token(v.lineHeight)])
)

// ---------------------------------------------------------------------------
// 4. Radius tokens
// ---------------------------------------------------------------------------

const radius: SDTree = Object.fromEntries(
  Object.entries(radiusTokens).map(([k, v]) => [k, token(v, 'dimension')])
)

// ---------------------------------------------------------------------------
// SD token tree
// ---------------------------------------------------------------------------

const tokens: SDTree = {
  ds: {
    color: {
      ...semanticColors,
      ...onColorTokens,
      ...lightSurface,
      ...darkSurface,
    },
    spacing: spacingPx,
    typography: {
      family:     fontFamily,
      weight:     fontWeight,
      size:       fontSize,
      lineHeight: lineHeight,
    },
    radius: radius,
  },
}

// ---------------------------------------------------------------------------
// Style Dictionary build
// ---------------------------------------------------------------------------

const sd = new StyleDictionary({
  tokens,
  platforms: {
    css: {
      transformGroup: 'css',
      files: [
        {
          destination: 'src/styles/tokens.css',
          format: 'css/variables',
          options: { outputReferences: false },
        },
      ],
    },
    scss: {
      transformGroup: 'scss',
      files: [
        {
          destination: 'src/styles/tokens.scss',
          format: 'scss/variables',
          options: { outputReferences: false },
        },
      ],
    },
    json: {
      transformGroup: 'js',
      files: [
        {
          destination: 'src/styles/tokens.json',
          format: 'json/nested',
        },
      ],
    },
  },
})

await sd.buildAllPlatforms()

console.log('\n✅ Tokens compilados com sucesso:')
console.log('   src/styles/tokens.css')
console.log('   src/styles/tokens.scss')
console.log('   src/styles/tokens.json\n')
