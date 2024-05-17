<script setup lang="ts">
  defineProps({
    color: {
      type: String,
      default: 'white', 
    },
    timeout: {
      type: Number,
      default: 6000
    },
    text: {
      type: String,
      required: true
    }
  });
const emit = defineEmits(["closeShow"])
const clickableCloseShow = () => {
  emit("closeShow", false)
}
</script>


<template>
  <v-snackbar
    :timeout="timeout"
    location="top center"
    :color="color"
  >
    {{ text }}
    <template v-slot:actions>
      <v-btn
        icon="mdi-close-circle"
        @click="clickableCloseShow"
        >
      </v-btn>
    </template>
  </v-snackbar>
</template>
