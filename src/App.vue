<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import MainHeader from './components/MainHeader.vue';
import MainSideNav from './components/MainSideNav.vue';
import { useMainStore } from './stores/main';
import { storeToRefs } from 'pinia';
import PopNotif from './components/PopNotif.vue';

const route = useRoute();
const mainStore = useMainStore();
const { hideNotification } = mainStore;
const { notification } = storeToRefs(mainStore)
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

    <PopNotif
      v-model="notification.show"
      :text="notification.text"
      :color="notification.color"
      :timeout="notification.timeout"
      @closeShow="hideNotification"
    />
  </v-layout>
</template>
