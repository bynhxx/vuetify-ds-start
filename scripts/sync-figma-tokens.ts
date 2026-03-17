#!/usr/bin/env tsx
/**
 * scripts/sync-figma-tokens.ts
 * Fase 4: Sincroniza design tokens → Figma Variables nativas
 *
 * Requisitos:
 *  - Figma Professional ou Organization (a Variables API não está disponível no plano Free)
 *  - Personal Access Token com permissão de escrita no arquivo
 *  - Node.js 18+ (fetch nativo)
 *
 * Uso:
 *   pnpm figma:sync              # aborta se já existirem coleções
 *   pnpm figma:sync -- --force   # exclui coleções existentes e recria tudo
 */

import { readFileSync } from 'node:fs'
import { resolve }      from 'node:path'

// ---------------------------------------------------------------------------
// 0. Carregar .env manualmente (sem dependência de dotenv)
// ---------------------------------------------------------------------------
try {
  const env = readFileSync(resolve(process.cwd(), '.env'), 'utf8')
  for (const line of env.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx < 0) continue
    const key = trimmed.slice(0, eqIdx).trim()
    const val = trimmed.slice(eqIdx + 1).trim()
    if (key && !(key in process.env)) process.env[key] = val
  }
} catch {
  // .env não existe — ok, variáveis podem estar no ambiente
}

// ---------------------------------------------------------------------------
// 1. Validar env
// ---------------------------------------------------------------------------
const FIGMA_TOKEN    = process.env.FIGMA_TOKEN
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY ?? 'FYtFSlDqNDCy7SYk3AZwK7'
const FORCE          = process.argv.includes('--force')

if (!FIGMA_TOKEN) {
  console.error('\n❌  FIGMA_TOKEN não encontrado.')
  console.error('    1. Crie o arquivo .env na raiz do projeto')
  console.error('    2. Adicione: FIGMA_TOKEN=seu_token_pessoal_aqui')
  console.error('    3. Gere o token em: https://www.figma.com/settings (Personal access tokens)\n')
  process.exit(1)
}

// ---------------------------------------------------------------------------
// 2. Imports dos tokens (TypeScript — sem build intermediário)
// ---------------------------------------------------------------------------
import { semantic, onColors, surfaceLight, surfaceDark } from '../src/tokens/color.js'
import { spacingTokens }    from '../src/tokens/spacing.js'
import { typographyTokens } from '../src/tokens/typography.js'
import { radiusTokens }     from '../src/tokens/radius.js'

// ---------------------------------------------------------------------------
// 3. Utilitários
// ---------------------------------------------------------------------------

/** Converte hex (#RRGGBB) para o formato de cor da Figma API {r,g,b,a} 0–1 */
function hexToFigmaColor(hex: string): { r: number; g: number; b: number; a: number } {
  const h = hex.replace('#', '')
  return {
    r: parseInt(h.slice(0, 2), 16) / 255,
    g: parseInt(h.slice(2, 4), 16) / 255,
    b: parseInt(h.slice(4, 6), 16) / 255,
    a: 1,
  }
}

/** Remove 'px' e converte para número */
function parsePx(value: string): number {
  return parseFloat(value.replace('px', ''))
}

/** Converte rem para px (base 16px) */
function remToPx(value: string): number {
  if (value === '0rem') return 0
  return Math.round(parseFloat(value.replace('rem', '')) * 16)
}

/** Wrapper fetch autenticado */
async function figmaFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`https://api.figma.com/v1${path}`, {
    ...options,
    headers: {
      'X-Figma-Token': FIGMA_TOKEN!,
      'Content-Type':  'application/json',
      ...options.headers,
    },
  })
  const json = await res.json() as Record<string, unknown>
  if (!res.ok || json.error) {
    throw new Error(
      `Figma API ${res.status}: ${JSON.stringify(json.message ?? json)}`,
    )
  }
  return json
}

// ---------------------------------------------------------------------------
// 4. Verificar coleções existentes
// ---------------------------------------------------------------------------
console.log('\n🔍  Verificando coleções existentes no arquivo…')
const localVars = await figmaFetch(`/files/${FIGMA_FILE_KEY}/variables/local`) as {
  meta: {
    variableCollections: Record<string, { id: string; name: string }>
  }
}

const existingCollections = Object.values(
  localVars.meta?.variableCollections ?? {},
)

if (existingCollections.length > 0 && !FORCE) {
  console.error('\n⚠️  O arquivo já contém coleções de variáveis:')
  existingCollections.forEach(c => console.error(`    • ${c.name} (${c.id})`))
  console.error('\n    Use --force para excluir e recriar tudo:')
  console.error('    pnpm figma:sync -- --force\n')
  process.exit(1)
}

// ---------------------------------------------------------------------------
// 5. Se --force, excluir coleções existentes
// ---------------------------------------------------------------------------
if (existingCollections.length > 0 && FORCE) {
  console.log(`\n🗑️   --force ativo: removendo ${existingCollections.length} coleção(ões) existente(s)…`)
  await figmaFetch(`/files/${FIGMA_FILE_KEY}/variables`, {
    method: 'POST',
    body: JSON.stringify({
      variableCollections: existingCollections.map(c => ({
        action: 'DELETE',
        id:     c.id,
      })),
    }),
  })
  console.log('    ✓ Coleções removidas.')
}

// ---------------------------------------------------------------------------
// 6. Montar o payload completo em uma única requisição batch
// ---------------------------------------------------------------------------
// Temp IDs internos (usados para cruzar referências dentro do request)
const T = {
  // Collections
  COLL_COLORS:  'COLL_COLORS',
  COLL_SPACING: 'COLL_SPACING',
  COLL_RADIUS:  'COLL_RADIUS',
  COLL_TYPE:    'COLL_TYPOGRAPHY',

  // Modes
  MODE_LIGHT:   'MODE_LIGHT',
  MODE_DARK:    'MODE_DARK',
  MODE_SP_DEF:  'MODE_SPACING_DEFAULT',
  MODE_RD_DEF:  'MODE_RADIUS_DEFAULT',
  MODE_TY_DEF:  'MODE_TYPOGRAPHY_DEFAULT',
}

// ── Coleções ──────────────────────────────────────────────────────────────
const variableCollections = [
  { action: 'CREATE', id: T.COLL_COLORS,  name: 'Colors',     initialModeId: T.MODE_LIGHT },
  { action: 'CREATE', id: T.COLL_SPACING, name: 'Spacing',    initialModeId: T.MODE_SP_DEF },
  { action: 'CREATE', id: T.COLL_RADIUS,  name: 'Radius',     initialModeId: T.MODE_RD_DEF },
  { action: 'CREATE', id: T.COLL_TYPE,    name: 'Typography', initialModeId: T.MODE_TY_DEF },
]

// ── Modos ─────────────────────────────────────────────────────────────────
// UPDATE renomeia o initialMode (Figma cria o primeiro modo automaticamente)
const variableModes = [
  { action: 'UPDATE', id: T.MODE_LIGHT,  name: 'Light',   variableCollectionId: T.COLL_COLORS },
  { action: 'CREATE', id: T.MODE_DARK,   name: 'Dark',    variableCollectionId: T.COLL_COLORS },
  { action: 'UPDATE', id: T.MODE_SP_DEF, name: 'Default', variableCollectionId: T.COLL_SPACING },
  { action: 'UPDATE', id: T.MODE_RD_DEF, name: 'Default', variableCollectionId: T.COLL_RADIUS },
  { action: 'UPDATE', id: T.MODE_TY_DEF, name: 'Default', variableCollectionId: T.COLL_TYPE },
]

// ── Variáveis & valores ───────────────────────────────────────────────────
type VarEntry = {
  id:     string
  name:   string
  type:   'COLOR' | 'FLOAT'
  collId: string
  values: Array<{ modeId: string; value: unknown }>
  description?: string
}

const vars: VarEntry[] = []
let varIdx = 0
function makeVar(
  name:   string,
  type:   'COLOR' | 'FLOAT',
  collId: string,
  values: Array<{ modeId: string; value: unknown }>,
  description?: string,
): VarEntry {
  return { id: `VAR_${varIdx++}`, name, type, collId, values, description }
}

// ---- 6a. Colors — semânticos de marca (mesmos em light e dark) -----------
const brandColors: Array<[string, string, string?]> = [
  ['color/primary',             semantic.primary,             'Cor de ação principal'],
  ['color/secondary',           semantic.secondary,           'Cor de ação secundária'],
  ['color/accent',              semantic.accent,              'Cor de destaque / contraste forte'],
  ['color/success',             semantic.success,             'Estado de sucesso'],
  ['color/warning',             semantic.warning,             'Estado de alerta'],
  ['color/error',               semantic.error,               'Estado de erro'],
  ['color/info',                semantic.info,                'Estado informativo'],
  ['color/primary-darken-1',    semantic['primary-darken-1'], 'primary escurecido 15% — hover/pressed'],
  ['color/primary-lighten-1',   semantic['primary-lighten-1'],'primary clareado — tint/chip (AA large text)'],
  ['color/secondary-darken-1',  semantic['secondary-darken-1'],'secondary escurecido 15%'],
  ['color/secondary-lighten-1', semantic['secondary-lighten-1'],'secondary clareado — tint'],
]
for (const [name, hex, desc] of brandColors) {
  const c = hexToFigmaColor(hex)
  vars.push(makeVar(name, 'COLOR', T.COLL_COLORS, [
    { modeId: T.MODE_LIGHT, value: c },
    { modeId: T.MODE_DARK,  value: c },
  ], desc))
}

// ---- 6b. Colors — on-* (mesmos em light e dark) --------------------------
const onColorEntries: Array<[string, string, string?]> = [
  ['color/on-primary',   onColors['on-primary'],   'Texto sobre primary — #FFFFFF 5.35:1 AA✅'],
  ['color/on-secondary', onColors['on-secondary'], 'Texto sobre secondary — #FFFFFF 5.31:1 AA✅'],
  ['color/on-accent',    onColors['on-accent'],    'Texto sobre accent — #FFFFFF 13.1:1 AA✅'],
  ['color/on-success',   onColors['on-success'],   'Texto sobre success — #212121 5.90:1 AA✅'],
  ['color/on-warning',   onColors['on-warning'],   'Texto sobre warning — #212121 8.25:1 AA✅'],
  ['color/on-error',     onColors['on-error'],     'Texto sobre error — #212121 5.86:1 AA✅'],
  ['color/on-info',      onColors['on-info'],      'Texto sobre info — #212121 5.35:1 AA✅'],
]
for (const [name, hex, desc] of onColorEntries) {
  const c = hexToFigmaColor(hex)
  vars.push(makeVar(name, 'COLOR', T.COLL_COLORS, [
    { modeId: T.MODE_LIGHT, value: c },
    { modeId: T.MODE_DARK,  value: c },
  ], desc))
}

// ---- 6c. Colors — superfícies (diferentes por tema) ----------------------
const surfaceEntries: Array<[string, string, string, string?]> = [
  ['color/background',     surfaceLight.background,       surfaceDark.background,       'Fundo da página'],
  ['color/surface',        surfaceLight.surface,          surfaceDark.surface,          'Cards, dialogs, sheets'],
  ['color/surface-bright', surfaceLight['surface-bright'],surfaceDark['surface-bright'],'Superfície elevada/destacada'],
  ['color/surface-light',  surfaceLight['surface-light'], surfaceDark['surface-light'], 'Superfície sutil'],
  ['color/surface-variant',surfaceLight['surface-variant'],surfaceDark['surface-variant'],'Superfície alternativa (chips)'],
]
for (const [name, lightHex, darkHex, desc] of surfaceEntries) {
  vars.push(makeVar(name, 'COLOR', T.COLL_COLORS, [
    { modeId: T.MODE_LIGHT, value: hexToFigmaColor(lightHex) },
    { modeId: T.MODE_DARK,  value: hexToFigmaColor(darkHex) },
  ], desc))
}

// ---- 6d. Colors — on-surface (diferentes por tema) -----------------------
const onSurfaceEntries: Array<[string, string, string, string?]> = [
  ['color/on-background',     surfaceLight['on-background'],     surfaceDark['on-background'],     'Texto sobre background'],
  ['color/on-surface',        surfaceLight['on-surface'],        surfaceDark['on-surface'],        'Texto sobre surface'],
  ['color/on-surface-variant',surfaceLight['on-surface-variant'],surfaceDark['on-surface-variant'],'Texto sobre surface-variant'],
]
for (const [name, lightHex, darkHex, desc] of onSurfaceEntries) {
  vars.push(makeVar(name, 'COLOR', T.COLL_COLORS, [
    { modeId: T.MODE_LIGHT, value: hexToFigmaColor(lightHex) },
    { modeId: T.MODE_DARK,  value: hexToFigmaColor(darkHex) },
  ], desc))
}

// ---- 6e. Spacing ----------------------------------------------------------
const SPACING_STEPS = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24] as const
for (const step of SPACING_STEPS) {
  const px = parsePx(spacingTokens.px[step])
  vars.push(makeVar(
    `spacing/${step}`,
    'FLOAT',
    T.COLL_SPACING,
    [{ modeId: T.MODE_SP_DEF, value: px }],
    `${px}px — ${spacingTokens.rem[step]}`,
  ))
}

// ---- 6f. Radius -----------------------------------------------------------
for (const [name, value] of Object.entries(radiusTokens)) {
  const px = parsePx(value)
  vars.push(makeVar(
    `radius/${name}`,
    'FLOAT',
    T.COLL_RADIUS,
    [{ modeId: T.MODE_RD_DEF, value: px }],
    value,
  ))
}

// ---- 6g. Typography — fontSize -------------------------------------------
for (const [level, scale] of Object.entries(typographyTokens.scale)) {
  const px = remToPx(scale.size)
  vars.push(makeVar(
    `typography/${level}`,
    'FLOAT',
    T.COLL_TYPE,
    [{ modeId: T.MODE_TY_DEF, value: px }],
    `${scale.size} — weight ${scale.weight} / lh ${scale.lineHeight}`,
  ))
}

// ---------------------------------------------------------------------------
// 7. Montar as 3 listas finais do payload
// ---------------------------------------------------------------------------
const variables = vars.map(v => ({
  action:                'CREATE',
  id:                    v.id,
  name:                  v.name,
  resolvedType:          v.type,
  variableCollectionId:  v.collId,
  description:           v.description ?? '',
  hiddenFromPublishing:  false,
  scopes:                v.type === 'COLOR' ? ['ALL_SCOPES'] : ['ALL_SCOPES'],
}))

const variableModeValues = vars.flatMap(v =>
  v.values.map(({ modeId, value }) => ({
    variableId: v.id,
    modeId,
    value,
  })),
)

const payload = {
  variableCollections,
  variableModes,
  variables,
  variableModeValues,
}

// ---------------------------------------------------------------------------
// 8. Enviar para a Figma API
// ---------------------------------------------------------------------------
console.log('\n📦  Enviando batch para a Figma API…')
console.log(`    • Coleções:            ${variableCollections.length}`)
console.log(`    • Modos:               ${variableModes.length}`)
console.log(`    • Variáveis:           ${variables.length}`)
console.log(`    • Valores (por modo):  ${variableModeValues.length}`)

const result = await figmaFetch(`/files/${FIGMA_FILE_KEY}/variables`, {
  method: 'POST',
  body:   JSON.stringify(payload),
}) as {
  meta: {
    variableCollections: Record<string, { id: string; name: string }>
    variables:           Record<string, { id: string; name: string; resolvedType: string }>
  }
}

// ---------------------------------------------------------------------------
// 9. Resumo
// ---------------------------------------------------------------------------
const createdCollections = Object.values(result.meta?.variableCollections ?? {})
const createdVariables   = Object.values(result.meta?.variables ?? {})

// Contagem por coleção
const byCollection = new Map<string, number>()
for (const v of vars) {
  const cname = {
    [T.COLL_COLORS]:  'Colors',
    [T.COLL_SPACING]: 'Spacing',
    [T.COLL_RADIUS]:  'Radius',
    [T.COLL_TYPE]:    'Typography',
  }[v.collId] ?? v.collId
  byCollection.set(cname, (byCollection.get(cname) ?? 0) + 1)
}

console.log('\n✅  Sincronização concluída!\n')
console.log('── Resumo ─────────────────────────────────────────────────────')
for (const [name, count] of byCollection) {
  console.log(`   ${name.padEnd(14)} ${count} variáveis`)
}
console.log(`   ${'TOTAL'.padEnd(14)} ${createdVariables.length} variáveis em ${createdCollections.length} coleções`)
console.log('───────────────────────────────────────────────────────────────')
console.log(`\n🔗  Arquivo: https://www.figma.com/file/${FIGMA_FILE_KEY}\n`)
