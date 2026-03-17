<template>
  <v-app>
    <v-app-bar flat border="b" density="compact">
      <v-app-bar-title>
        <router-link to="/" class="text-decoration-none text-high-emphasis text-body-2 font-weight-medium">
          vuetify-ds-starter
        </router-link>
      </v-app-bar-title>

      <template #append>
        <v-btn
          variant="text"
          size="small"
          to="/design-system"
          class="mr-1"
        >
          Design System
        </v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
// App shell limpo — sem estilos hardcoded
// Todos os valores visuais vêm dos tokens via plugins/vuetify.ts
</script>
