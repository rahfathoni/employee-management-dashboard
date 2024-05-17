<script setup lang="ts">
  import { useMainStore } from '../stores/main';
  import { storeToRefs } from 'pinia';

  const mainStore = useMainStore();
  const { showNavBar } = storeToRefs(mainStore);
</script>

<template>
  <v-app-bar class="pr-2">
    <v-app-bar-nav-icon icon="mdi-view-headline" variant="text" @click.stop="showNavBar = !showNavBar"></v-app-bar-nav-icon>
    <v-toolbar-title>Employee Management Dashboard</v-toolbar-title>
  </v-app-bar>
</template>
