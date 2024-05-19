<script setup lang="ts">
  import { ref } from 'vue';
  import { useMainStore } from '../stores/main';
  import { storeToRefs } from 'pinia';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const mainStore = useMainStore();
  const { showNavBar, loadingOverlay } = storeToRefs(mainStore);
  const { logoutUser, showNotification } = mainStore;
  const navMenu = ref([
    {label: 'Home', icon: 'mdi-home', route: "/"},
    {label: 'Employees', icon: 'mdi-account-group', route: "/employee"},
  ]);

  const logout = async () => {
    loadingOverlay.value = true;
    try {
      const response = await logoutUser();
      if (response.status === true) {
        router.push({ path: '/login' });
        showNotification('Logout success', 'success', 3000);
      }
      loadingOverlay.value = false;
    } catch (err: any) {
      loadingOverlay.value = false;
      if (err.response.status === 401) {
        if (err.response.data.message.includes("token is expired")) {
          showNotification('Timeout. Please Login again', 'warning');
        }
        showNotification('Please Login again', 'warning');
        router.push({ path: '/login' });
      } else {
        showNotification('Something went wrong. Plase try again later', 'error');
      }
    }
  }
</script>

<template>
  <v-navigation-drawer color="white" v-model="showNavBar">
    <v-list>
      <v-list-item v-for="(item, i) in navMenu" :key="i" :to="item.route">
        <v-list-item-title>
          <v-list-item-icon class="pr-5">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          {{ item.label }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn 
          block
          color="primary"
          @click="logout"
        >
          Logout
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>