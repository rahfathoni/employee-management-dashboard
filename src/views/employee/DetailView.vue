<script setup lang="ts">
  import { useRoute } from 'vue-router';

  const route = useRoute()
</script>

<template>
  <main id="detailEmployeePage" class="">
    <h1>This is an Detail Employee page for id {{ route.params.id }}</h1>
  </main>
</template>
