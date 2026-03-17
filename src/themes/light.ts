/**
 * Tema Light — Vuetify 3
 *
 * Todos os 6 tokens de superfície implícitos declarados explicitamente
 * (ver docs/AUDIT.md §8 — Pontos de Override Seguros):
 *   surface-bright, surface-light, surface-variant, on-surface-variant,
 *   primary-darken-1, secondary-darken-1
 *
 * Fonte de valores: src/tokens/color.ts
 */

import { semantic, onColors, surfaceLight } from '@/tokens/color'
import type { ThemeDefinition } from 'vuetify'

export const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    // --- Semânticas de marca ---
    primary:              semantic.primary,
    'primary-darken-1':   semantic['primary-darken-1'],   // ✅ declarado explicitamente
    'primary-lighten-1':  semantic['primary-lighten-1'],
    secondary:            semantic.secondary,
    'secondary-darken-1': semantic['secondary-darken-1'], // ✅ declarado explicitamente
    'secondary-lighten-1':semantic['secondary-lighten-1'],
    accent:               semantic.accent,
    error:                semantic.error,
    info:                 semantic.info,
    success:              semantic.success,
    warning:              semantic.warning,

    // --- on-* semânticos ---
    'on-primary':             onColors['on-primary'],
    'on-primary-darken-1':    onColors['on-primary-darken-1'],
    'on-primary-lighten-1':   onColors['on-primary-lighten-1'],
    'on-secondary':           onColors['on-secondary'],
    'on-secondary-darken-1':  onColors['on-secondary-darken-1'],
    'on-secondary-lighten-1': onColors['on-secondary-lighten-1'],
    'on-error':               onColors['on-error'],
    'on-info':                onColors['on-info'],
    'on-success':             onColors['on-success'],
    'on-warning':             onColors['on-warning'],

    // --- Superfícies (6 tokens implícitos + on-* explícitos) ---
    background:             surfaceLight.background,
    surface:                surfaceLight.surface,
    'surface-bright':       surfaceLight['surface-bright'],   // ✅ explícito
    'surface-light':        surfaceLight['surface-light'],    // ✅ explícito
    'surface-variant':      surfaceLight['surface-variant'],  // ✅ explícito
    'on-surface':           surfaceLight['on-surface'],
    'on-background':        surfaceLight['on-background'],
    'on-surface-bright':    surfaceLight['on-surface-bright'],
    'on-surface-light':     surfaceLight['on-surface-light'],
    'on-surface-variant':   surfaceLight['on-surface-variant'], // ✅ explícito
  },
  variables: {
    // Opacidades de ênfase (Material Design)
    'high-emphasis-opacity':    0.87,
    'medium-emphasis-opacity':  0.60,
    'disabled-opacity':         0.38,
    // Opacidades de estado interativo
    'idle-opacity':             0.04,
    'hover-opacity':            0.04,
    'focus-opacity':            0.12,
    'selected-opacity':         0.08,
    'activated-opacity':        0.12,
    'pressed-opacity':          0.12,
    'dragged-opacity':          0.08,
    // Border
    'border-color':             '#212121',
    'border-opacity':           0.12,
  },
}
