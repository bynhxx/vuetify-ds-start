<template>
  <v-container fluid class="pa-6 pb-16">

    <!-- ── Cabeçalho + Toggle ─────────────────────────────────────────── -->
    <div class="d-flex align-center justify-space-between mb-8">
      <div>
        <h1 class="text-h4 font-weight-semibold mb-1">Design System</h1>
        <p class="text-body-2 text-medium-emphasis">
          Fase 3 — Tokens aplicados ao Vuetify 3
        </p>
      </div>

      <v-btn
        :prepend-icon="isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        variant="tonal"
        @click="toggleTheme"
      >
        {{ isDark ? 'Light' : 'Dark' }}
      </v-btn>
    </div>

    <v-divider class="mb-10" />

    <!-- ── 1. CORES ───────────────────────────────────────────────────── -->
    <section class="mb-12">
      <ds-section-title>1. Cores</ds-section-title>

      <h3 class="text-subtitle-2 text-medium-emphasis mb-3 mt-6">Semânticas de marca</h3>
      <v-row dense>
        <v-col
          v-for="c in semanticColors"
          :key="c.token"
          cols="6" sm="4" md="3" lg="2"
        >
          <v-card rounded="lg" elevation="0" border>
            <div
              class="d-flex flex-column justify-end pa-3"
              :style="{ backgroundColor: `rgb(var(--v-theme-${c.token}))`, minHeight: '88px' }"
            >
              <span
                class="text-caption font-weight-medium"
                :style="{ color: `rgb(var(--v-theme-on-${c.token}))` }"
              >
                {{ c.label }}
              </span>
              <span
                class="text-caption"
                style="opacity: 0.8"
                :style="{ color: `rgb(var(--v-theme-on-${c.token}))` }"
              >
                {{ c.hex }}
              </span>
            </div>
            <v-card-text class="py-2 px-3">
              <code class="text-caption text-medium-emphasis">{{ c.token }}</code>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <h3 class="text-subtitle-2 text-medium-emphasis mb-3 mt-6">Superfícies (tema atual)</h3>
      <v-row dense>
        <v-col
          v-for="s in currentSurfaces"
          :key="s.token"
          cols="6" sm="4" md="3"
        >
          <v-card rounded="lg" elevation="0" border>
            <div
              class="d-flex flex-column justify-end pa-3"
              :style="{ backgroundColor: s.hex, minHeight: '64px', border: '1px solid rgba(128,128,128,0.15)' }"
            >
              <span
                class="text-caption font-weight-medium"
                :style="{ color: s.onHex }"
              >
                {{ s.label }}
              </span>
              <span
                class="text-caption"
                style="opacity: 0.75"
                :style="{ color: s.onHex }"
              >
                {{ s.hex }}
              </span>
            </div>
            <v-card-text class="py-2 px-3">
              <code class="text-caption text-medium-emphasis">{{ s.token }}</code>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <h3 class="text-subtitle-2 text-medium-emphasis mb-3 mt-6">Variações automáticas (primary)</h3>
      <div class="d-flex ga-1 flex-wrap">
        <div
          v-for="v in primaryVariations"
          :key="v.label"
          class="d-flex flex-column align-center justify-center rounded pa-2 text-center"
          :style="{ backgroundColor: `rgb(var(--v-theme-${v.cssVar}))`, width: '80px', height: '64px' }"
        >
          <span class="text-caption" style="font-size: 9px; color: #fff; text-shadow: 0 1px 2px rgba(0,0,0,.5)">
            {{ v.label }}
          </span>
        </div>
      </div>
    </section>

    <!-- ── 2. TIPOGRAFIA ──────────────────────────────────────────────── -->
    <section class="mb-12">
      <ds-section-title>2. Tipografia</ds-section-title>
      <p class="text-caption text-medium-emphasis mb-6">
        Família: <code>Inter, sans-serif</code> · Base: 1rem = 16px
      </p>

      <v-card rounded="lg" border elevation="0">
        <v-list lines="two" class="pa-0">
          <v-list-item
            v-for="t in typeScale"
            :key="t.token"
            :class="`text-${t.token}`"
            class="px-6 py-3 border-b"
          >
            <template #title>
              <span :class="`text-${t.token}`">{{ t.sample }}</span>
            </template>
            <template #subtitle>
              <code class="text-caption text-medium-emphasis">
                .text-{{ t.token }} · {{ t.size }} / {{ t.weight }} / lh {{ t.lineHeight }}
              </code>
            </template>
          </v-list-item>
        </v-list>
      </v-card>
    </section>

    <!-- ── 3. ESPAÇAMENTO ─────────────────────────────────────────────── -->
    <section class="mb-12">
      <ds-section-title>3. Espaçamento</ds-section-title>
      <p class="text-caption text-medium-emphasis mb-6">
        Base: <code>$spacer = 4px</code> · Escala multiplicada
      </p>

      <v-card rounded="lg" border elevation="0" class="pa-6">
        <div
          v-for="s in spacingScale"
          :key="s.step"
          class="d-flex align-center ga-4 mb-3"
        >
          <span class="text-caption text-medium-emphasis" style="min-width: 80px">
            <code>{{ s.step }} = {{ s.px }}</code>
          </span>
          <div
            class="rounded-sm bg-primary"
            style="height: 20px"
            :style="{ width: s.px, opacity: 0.75 }"
          />
          <span class="text-caption text-medium-emphasis">{{ s.rem }}</span>
        </div>
      </v-card>
    </section>

    <!-- ── 4. BORDER RADIUS ───────────────────────────────────────────── -->
    <section class="mb-12">
      <ds-section-title>4. Border Radius</ds-section-title>
      <p class="text-caption text-medium-emphasis mb-6">
        Base: <code>$border-radius-root = 8px</code>
      </p>

      <v-row dense>
        <v-col
          v-for="r in radiusScale"
          :key="r.name"
          cols="6" sm="4" md="2"
        >
          <div class="d-flex flex-column align-center ga-2">
            <div
              class="bg-primary d-flex align-center justify-center"
              style="width: 80px; height: 80px; opacity: 0.75"
              :style="{ borderRadius: r.value }"
            />
            <span class="text-caption font-weight-medium">{{ r.name }}</span>
            <code class="text-caption text-medium-emphasis">{{ r.value }}</code>
          </div>
        </v-col>
      </v-row>
    </section>

    <!-- ── 5. ELEVAÇÃO ────────────────────────────────────────────────── -->
    <section class="mb-12">
      <ds-section-title>5. Elevação</ds-section-title>
      <p class="text-caption text-medium-emphasis mb-6">
        Sistema de 3 camadas (umbra + penumbra + ambient) · 0–24
      </p>

      <v-row dense>
        <v-col
          v-for="e in elevations"
          :key="e"
          cols="4" sm="3" md="2"
        >
          <v-card
            :elevation="e"
            rounded="lg"
            class="d-flex align-center justify-center"
            height="72"
          >
            <span class="text-caption text-medium-emphasis">
              <code>e-{{ e }}</code>
            </span>
          </v-card>
        </v-col>
      </v-row>
    </section>

    <!-- ── 6. COMPONENTES ─────────────────────────────────────────────── -->
    <section class="mb-12">
      <ds-section-title>6. Componentes</ds-section-title>

      <h3 class="text-subtitle-2 text-medium-emphasis mb-4 mt-6">Botões</h3>
      <v-card rounded="lg" border elevation="0" class="pa-6">
        <div class="d-flex flex-wrap ga-3 mb-4">
          <v-btn v-for="variant in btnVariants" :key="variant" :variant="variant" color="primary">
            {{ variant }}
          </v-btn>
        </div>
        <div class="d-flex flex-wrap ga-3 mb-4">
          <v-btn v-for="color in btnColors" :key="color" :color="color" variant="flat">
            {{ color }}
          </v-btn>
        </div>
        <div class="d-flex flex-wrap ga-3">
          <v-btn v-for="size in btnSizes" :key="size" :size="size" color="primary" variant="tonal">
            {{ size }}
          </v-btn>
        </div>
      </v-card>

      <h3 class="text-subtitle-2 text-medium-emphasis mb-4 mt-6">Chips</h3>
      <v-card rounded="lg" border elevation="0" class="pa-6">
        <div class="d-flex flex-wrap ga-2">
          <v-chip
            v-for="color in btnColors"
            :key="color"
            :color="color"
            variant="tonal"
          >
            {{ color }}
          </v-chip>
          <v-chip color="primary" closable>closable</v-chip>
          <v-chip color="secondary" prepend-icon="mdi-star">com ícone</v-chip>
        </div>
      </v-card>

      <h3 class="text-subtitle-2 text-medium-emphasis mb-4 mt-6">Alertas</h3>
      <v-card rounded="lg" border elevation="0" class="pa-6">
        <div class="d-flex flex-column ga-3">
          <v-alert
            v-for="t in alertTypes"
            :key="t.type"
            :type="t.type"
            :title="t.title"
            :text="t.text"
            variant="tonal"
            density="compact"
          />
        </div>
      </v-card>
    </section>

  </v-container>
</template>

<script setup lang="ts">
import { computed, defineComponent, h } from 'vue'
import { useTheme } from 'vuetify'
import { semantic, surfaceLight, surfaceDark, onColors } from '@/tokens/color'
import { spacingTokens } from '@/tokens/spacing'
import { typographyTokens } from '@/tokens/typography'
import { radiusTokens } from '@/tokens/radius'

// ── Sub-componente local ────────────────────────────────────────────────────
const DsSectionTitle = defineComponent({
  props: { default: String },
  setup(_props, { slots }) {
    return () =>
      h('h2', { class: 'text-h6 font-weight-semibold mb-4 d-flex align-center ga-2' }, [
        h('span', { class: 'ds-section-bar' }),
        slots.default?.(),
      ])
  },
})

// ── Tema ────────────────────────────────────────────────────────────────────
const theme = useTheme()
const isDark = computed(() => theme.global.current.value.dark)

function toggleTheme() {
  theme.global.name.value = isDark.value ? 'light' : 'dark'
}

// ── 1. Cores ─────────────────────────────────────────────────────────────────
const semanticColors = [
  { token: 'primary',   label: 'Primary',   hex: semantic.primary },
  { token: 'secondary', label: 'Secondary', hex: semantic.secondary },
  { token: 'accent',    label: 'Accent',    hex: semantic.accent },
  { token: 'success',   label: 'Success',   hex: semantic.success },
  { token: 'warning',   label: 'Warning',   hex: semantic.warning },
  { token: 'error',     label: 'Error',     hex: semantic.error },
  { token: 'info',      label: 'Info',      hex: semantic.info },
]

const currentSurfaces = computed(() => {
  const s = isDark.value ? surfaceDark : surfaceLight
  const onBg     = isDark.value ? surfaceDark['on-background']    : surfaceLight['on-background']
  const onSurf   = isDark.value ? surfaceDark['on-surface']       : surfaceLight['on-surface']
  const onVariant = isDark.value ? surfaceDark['on-surface-variant'] : surfaceLight['on-surface-variant']

  return [
    { token: 'background',    label: 'Background',    hex: s.background,         onHex: onBg },
    { token: 'surface',       label: 'Surface',       hex: s.surface,            onHex: onSurf },
    { token: 'surface-bright',label: 'Surface Bright',hex: s['surface-bright'],  onHex: onSurf },
    { token: 'surface-light', label: 'Surface Light', hex: s['surface-light'],   onHex: onSurf },
    { token: 'surface-variant',label:'Surface Variant',hex: s['surface-variant'],onHex: onVariant },
  ]
})

const primaryVariations = [
  { label: 'darken-3',  cssVar: 'primary-darken-3' },
  { label: 'darken-2',  cssVar: 'primary-darken-2' },
  { label: 'darken-1',  cssVar: 'primary-darken-1' },
  { label: 'primary',   cssVar: 'primary' },
  { label: 'lighten-1', cssVar: 'primary-lighten-1' },
  { label: 'lighten-2', cssVar: 'primary-lighten-2' },
  { label: 'lighten-3', cssVar: 'primary-lighten-3' },
]

// ── 2. Tipografia ─────────────────────────────────────────────────────────────
const typeScale = [
  { token: 'h1',         sample: 'Heading 1',  ...typographyTokens.scale.h1,       size: '6rem',      weight: '300', lineHeight: '1' },
  { token: 'h2',         sample: 'Heading 2',  ...typographyTokens.scale.h2,       size: '3.75rem',   weight: '300', lineHeight: '1' },
  { token: 'h3',         sample: 'Heading 3',  ...typographyTokens.scale.h3,       size: '3rem',      weight: '400', lineHeight: '1.05' },
  { token: 'h4',         sample: 'Heading 4',  ...typographyTokens.scale.h4,       size: '2.125rem',  weight: '400', lineHeight: '1.175' },
  { token: 'h5',         sample: 'Heading 5',  ...typographyTokens.scale.h5,       size: '1.5rem',    weight: '400', lineHeight: '1.333' },
  { token: 'h6',         sample: 'Heading 6',  ...typographyTokens.scale.h6,       size: '1.25rem',   weight: '500', lineHeight: '1.6' },
  { token: 'subtitle-1', sample: 'Subtitle 1', ...typographyTokens.scale.subtitle1, size: '1rem',     weight: '400', lineHeight: '1.75' },
  { token: 'subtitle-2', sample: 'Subtitle 2', ...typographyTokens.scale.subtitle2, size: '0.875rem', weight: '500', lineHeight: '1.6' },
  { token: 'body-1',     sample: 'Body 1 — The quick brown fox jumps over the lazy dog.', ...typographyTokens.scale.body1, size: '1rem', weight: '400', lineHeight: '1.5' },
  { token: 'body-2',     sample: 'Body 2 — The quick brown fox jumps over the lazy dog.', ...typographyTokens.scale.body2, size: '0.875rem', weight: '400', lineHeight: '1.425' },
  { token: 'caption',    sample: 'Caption text', ...typographyTokens.scale.caption, size: '0.75rem', weight: '400', lineHeight: '1.667' },
  { token: 'overline',   sample: 'OVERLINE TEXT', ...typographyTokens.scale.overline, size: '0.75rem', weight: '500', lineHeight: '2.667' },
]

// ── 3. Espaçamento ────────────────────────────────────────────────────────────
const spacingScale = Object.entries(spacingTokens.px)
  .filter(([step]) => ['1','2','3','4','5','6','8','10','12','16'].includes(step))
  .map(([step, px]) => ({
    step: `spacing-${step}`,
    px,
    rem: spacingTokens.rem[Number(step) as keyof typeof spacingTokens.rem],
  }))

// ── 4. Border Radius ──────────────────────────────────────────────────────────
const radiusScale = Object.entries(radiusTokens).map(([name, value]) => ({ name, value }))

// ── 5. Elevação ───────────────────────────────────────────────────────────────
const elevations = [0, 1, 2, 4, 6, 8, 12, 16, 24]

// ── 6. Componentes ────────────────────────────────────────────────────────────
const btnVariants = ['flat', 'tonal', 'outlined', 'text', 'plain'] as const
const btnColors   = ['primary', 'secondary', 'success', 'warning', 'error', 'info']
const btnSizes    = ['x-small', 'small', 'default', 'large', 'x-large'] as const

const alertTypes = [
  { type: 'success' as const, title: 'Sucesso', text: 'Operação concluída com sucesso.' },
  { type: 'info'    as const, title: 'Info',    text: 'Uma informação importante para o usuário.' },
  { type: 'warning' as const, title: 'Atenção', text: 'Verifique os dados antes de continuar.' },
  { type: 'error'   as const, title: 'Erro',    text: 'Ocorreu um erro. Tente novamente.' },
]
</script>

<style scoped>
.ds-section-bar {
  display: inline-block;
  width: 4px;
  height: 18px;
  border-radius: 2px;
  background-color: rgb(var(--v-theme-primary));
}

/* Remove border-b da última linha da lista de tipografia */
:deep(.v-list-item:last-child) {
  border-bottom: none !important;
}
</style>
