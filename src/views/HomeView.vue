<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="mt-8" elevation="2" rounded="lg">
          <v-card-title class="text-h5 pa-4">
            Vuetify DS Starter
          </v-card-title>
          <v-card-text>
            <p class="text-body-1 mb-4">
              Vue 3 + Vuetify 3 + TypeScript Design System starter.
            </p>
            <v-btn color="primary" variant="tonal" @click="toggleTheme">
              Toggle Theme
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'

const theme = useTheme()

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>
