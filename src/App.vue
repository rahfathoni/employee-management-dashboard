<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import MainHeader from './components/MainHeader.vue';
import MainSideNav from './components/MainSideNav.vue';

const route = useRoute();
</script>

<template>
  <v-layout class="rounded rounded-md">
    <section id="layoutComponent" v-if="route.name !== 'login'">
      <MainSideNav />
      <MainHeader class="pt-3" />
    </section>
    <v-main class="h-screen bg-ghost-white">
      <RouterView class="px-2 py-5 bg-ghost-white"/>
    </v-main>
  </v-layout>
</template>
