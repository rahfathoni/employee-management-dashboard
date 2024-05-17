<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { useMainStore } from '../stores/main';
  import { storeToRefs } from 'pinia';
  import { useRouter } from 'vue-router';
  import PopNotif from '@/components/PopNotif.vue';

  const router = useRouter();
  const mainStore = useMainStore();
  const { showNavBar } = storeToRefs(mainStore);
  const { logoutUser } = mainStore;
  const navMenu = ref([
    {label: 'Home', icon: 'mdi-home', route: "/"},
    {label: 'Employees', icon: 'mdi-account-group', route: "/employee"},
  ]);
  const snackbar = reactive({
    show: false,
    text: '',
    color: '',
    timeout: 3000
  });

  const logout = async () => {
    try {
      const response = await logoutUser();
      if (response.status === true) {
        router.push({ path: '/login' });
      }
    } catch (err: any) {
      if (err.response.status === 401) {
        router.push({ path: '/login' });
      } else {
        snackbar.text = "Error. Plase try again later";
        snackbar.color = "error";
      }
      snackbar.show = true;
    }
  }
  const closePopup = (val: boolean) => {
    snackbar.show = val;
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

  <PopNotif
    v-model="snackbar.show"
    :text="snackbar.text"
    :color="snackbar.color"
    :timeout="snackbar.timeout"
    @closeShow="closePopup"
  />
</template>