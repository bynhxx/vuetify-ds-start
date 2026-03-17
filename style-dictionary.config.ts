/**
 * Style Dictionary v5 — Build de tokens
 *
 * Saídas:
 *  1. src/styles/tokens.css              — CSS custom properties (:root)
 *  2. src/styles/tokens.scss             — SCSS variables ($)
 *  3. src/styles/tokens.json             — JSON flat (referência interna)
 *  4. src/styles/tokens.global.w3c.json  — W3C/DTCG global (spacing, radius, typography)
 *  5. src/styles/tokens.light.w3c.json   — W3C/DTCG light theme (cores)
 *  6. src/styles/tokens.dark.w3c.json    — W3C/DTCG dark  theme (cores)
 *
 * Execução: pnpm tokens:build  (tsx style-dictionary.config.ts)
 */

import StyleDictionary  from 'style-dictionary'
import { writeFileSync } from 'node:fs'

import { colorTokens, semantic, onColors, surfaceLight, surfaceDark } from './src/tokens/color.js'
import { spacingTokens }    from './src/tokens/spacing.js'
import { typographyTokens } from './src/tokens/typography.js'
import { radiusTokens }     from './src/tokens/radius.js'

// ============================================================================
// PARTE 1 — Style Dictionary (CSS · SCSS · JSON)
// ============================================================================

type SDToken = { $value: string | number; $type?: string; comment?: string }
type SDTree  = { [key: string]: SDToken | SDTree }

function sdToken(value: string | number, type?: string, comment?: string): SDToken {
  return { $value: value, ...(type ? { $type: type } : {}), ...(comment ? { comment } : {}) }
}

// ── SD: cores ────────────────────────────────────────────────────────────────
const sdSemanticColors: SDTree = Object.fromEntries(
  Object.entries(colorTokens.semantic).map(([k, v]) => [k.replace(/-/g, '_'), sdToken(v, 'color')])
)
const sdOnColors: SDTree = Object.fromEntries(
  Object.entries(colorTokens.onColors).map(([k, v]) => [k.replace(/-/g, '_'), sdToken(v, 'color')])
)
const sdLightSurface: SDTree = Object.fromEntries(
  Object.entries(colorTokens.light).map(([k, v]) => [`light_${k.replace(/-/g, '_')}`, sdToken(v, 'color')])
)
const sdDarkSurface: SDTree = Object.fromEntries(
  Object.entries(colorTokens.dark).map(([k, v]) => [`dark_${k.replace(/-/g, '_')}`, sdToken(v, 'color')])
)

// ── SD: spacing ───────────────────────────────────────────────────────────────
const sdSpacing: SDTree = Object.fromEntries(
  Object.entries(spacingTokens.px).map(([k, v]) => [`s${k}`, sdToken(v, 'dimension')])
)

// ── SD: typography ────────────────────────────────────────────────────────────
const sdFontFamily: SDTree  = Object.fromEntries(Object.entries(typographyTokens.fontFamily).map(([k, v]) => [k, sdToken(v)]))
const sdFontWeight: SDTree  = Object.fromEntries(Object.entries(typographyTokens.fontWeight).map(([k, v]) => [k, sdToken(v)]))
const sdFontSize: SDTree    = Object.fromEntries(Object.entries(typographyTokens.scale).map(([k, v]) => [k, sdToken(v.size, 'dimension')]))
const sdLineHeight: SDTree  = Object.fromEntries(Object.entries(typographyTokens.scale).map(([k, v]) => [k, sdToken(v.lineHeight)]))

// ── SD: radius ────────────────────────────────────────────────────────────────
const sdRadius: SDTree = Object.fromEntries(
  Object.entries(radiusTokens).map(([k, v]) => [k, sdToken(v, 'dimension')])
)

// ── SD: token tree ────────────────────────────────────────────────────────────
const sdTokens: SDTree = {
  ds: {
    color: { ...sdSemanticColors, ...sdOnColors, ...sdLightSurface, ...sdDarkSurface },
    spacing: sdSpacing,
    typography: { family: sdFontFamily, weight: sdFontWeight, size: sdFontSize, lineHeight: sdLineHeight },
    radius: sdRadius,
  },
}

const sd = new StyleDictionary({
  tokens: sdTokens,
  platforms: {
    css: {
      transformGroup: 'css',
      files: [{ destination: 'src/styles/tokens.css', format: 'css/variables', options: { outputReferences: false } }],
    },
    scss: {
      transformGroup: 'scss',
      files: [{ destination: 'src/styles/tokens.scss', format: 'scss/variables', options: { outputReferences: false } }],
    },
    json: {
      transformGroup: 'js',
      files: [{ destination: 'src/styles/tokens.json', format: 'json/nested' }],
    },
  },
})

await sd.buildAllPlatforms()

// ============================================================================
// PARTE 2 — W3C/DTCG (Tokens Studio)
// ============================================================================

// ── Tipos W3C ─────────────────────────────────────────────────────────────────
type W3CType  = 'color' | 'dimension'
type W3CToken = { $value: string; $type: W3CType; $description?: string }
type W3CGroup = { [key: string]: W3CToken | W3CGroup }

// Descrições semânticas exibidas no Tokens Studio
const DESC: Record<string, string> = {
  'primary':              'Cor de ação principal',
  'secondary':            'Cor de ação secundária',
  'accent':               'Destaque — alto contraste',
  'success':              'Estado de sucesso',
  'warning':              'Estado de alerta',
  'error':                'Estado de erro',
  'info':                 'Estado informativo',
  'primary-darken-1':     'primary −15% — hover/pressed. WCAG AA #FFF 7.59:1',
  'primary-lighten-1':    'primary tint — chip/badge. WCAG AA-large #FFF 3.75:1',
  'secondary-darken-1':   'secondary −15%. WCAG AA #FFF 7.12:1',
  'secondary-lighten-1':  'secondary tint. WCAG AA-large #212121 3.77:1',
  'on-primary':           'Texto sobre primary — #FFF 5.35:1 ✅',
  'on-secondary':         'Texto sobre secondary — #FFF 5.31:1 ✅',
  'on-accent':            'Texto sobre accent — #FFF 13.1:1 ✅',
  'on-success':           'Texto sobre success — #212121 5.90:1 ✅',
  'on-warning':           'Texto sobre warning — #212121 8.25:1 ✅',
  'on-error':             'Texto sobre error — #212121 5.86:1 ✅',
  'on-info':              'Texto sobre info — #212121 5.35:1 ✅',
  'background':           'Fundo da página (body)',
  'surface':              'Cards, dialogs, sheets',
  'surface-bright':       'Superfície elevada/destacada',
  'surface-light':        'Superfície sutil',
  'surface-variant':      'Superfície alternativa — chips, tags',
  'on-background':        'Texto sobre background',
  'on-surface':           'Texto sobre surface',
  'on-surface-variant':   'Texto sobre surface-variant',
}

function w3cColor(hex: string, key?: string): W3CToken {
  const desc = key ? DESC[key] : undefined
  return { $value: hex.toLowerCase(), $type: 'color', ...(desc ? { $description: desc } : {}) }
}

function w3cDim(px: string, desc?: string): W3CToken {
  return { $value: px, $type: 'dimension', ...(desc ? { $description: desc } : {}) }
}

/** Converte "1.5rem" → "24px", "0rem" → "0px" */
function remToPxStr(rem: string): string {
  if (rem === '0rem' || rem === '0') return '0px'
  return `${Math.round(parseFloat(rem) * 16)}px`
}

// ── W3C: cores por tema ───────────────────────────────────────────────────────
type Surfaces = typeof surfaceLight | typeof surfaceDark

function buildColorGroup(surfaces: Surfaces): Record<string, W3CToken> {
  const out: Record<string, W3CToken> = {}

  // Semânticos (mesmos em light e dark — paleta agnóstica)
  for (const [k, v] of Object.entries(semantic))  out[k] = w3cColor(v, k)

  // on-* semânticos
  for (const [k, v] of Object.entries(onColors))  out[k] = w3cColor(v, k)

  // Superfícies específicas do tema (valores diferentes entre light e dark)
  for (const [k, v] of Object.entries(surfaces))  out[k] = w3cColor(v, k)

  return out
}

// ── W3C: tokens globais (agnósticos de tema) ──────────────────────────────────
const SPACING_STEPS = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24] as const

const globalW3C: W3CGroup = {
  spacing: Object.fromEntries(
    SPACING_STEPS.map(n => [
      String(n),
      w3cDim(`${n * 4}px`, n > 0 ? `${n} × 4px = ${n * 4}px` : '0px'),
    ])
  ),
  borderRadius: Object.fromEntries(
    Object.entries(radiusTokens).map(([k, v]) => [
      k,
      w3cDim(v, k === 'md' ? '$border-radius-root — base do DS (8px)' : undefined),
    ])
  ),
  typography: Object.fromEntries(
    Object.entries(typographyTokens.scale).map(([level, scale]) => [
      level,
      w3cDim(
        remToPxStr(scale.size),
        `${scale.size} — weight: ${scale.weight} / lh: ${scale.lineHeight}`,
      ),
    ])
  ),
}

const lightW3C: W3CGroup = { color: buildColorGroup(surfaceLight) }
const darkW3C: W3CGroup  = { color: buildColorGroup(surfaceDark)  }

// ── Escrever arquivos W3C ─────────────────────────────────────────────────────
const w3cFiles: Array<[string, W3CGroup]> = [
  ['src/styles/tokens.global.w3c.json', globalW3C],
  ['src/styles/tokens.light.w3c.json',  lightW3C],
  ['src/styles/tokens.dark.w3c.json',   darkW3C],
]

for (const [path, data] of w3cFiles) {
  writeFileSync(path, JSON.stringify(data, null, 2) + '\n')
}

// ============================================================================
// Resumo
// ============================================================================
console.log('\n✅  Tokens compilados com sucesso:')
console.log('    ── Style Dictionary ──────────────────')
console.log('    src/styles/tokens.css')
console.log('    src/styles/tokens.scss')
console.log('    src/styles/tokens.json')
console.log('    ── W3C/DTCG (Tokens Studio) ──────────')
console.log('    src/styles/tokens.global.w3c.json')
console.log('    src/styles/tokens.light.w3c.json')
console.log('    src/styles/tokens.dark.w3c.json')
console.log('')
