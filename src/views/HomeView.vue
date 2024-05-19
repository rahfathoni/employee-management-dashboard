<script setup lang="ts">
import { useMainStore } from '@/stores/main';
import { storeToRefs } from 'pinia';

const mainStore = useMainStore();
const { user } = storeToRefs(mainStore);
</script>

<template>
  <main id="homePage" class="mt-15 justify-center d-flex-col text-center">
    <h1 name="title">
      Hello {{ user.name }}. Welcome to Employee Management Dashboard.
    </h1>
    <h2 name="subtitle">
      Home page on development. Please go to other page via Side Bar
    </h2>
  </main>
</template>
