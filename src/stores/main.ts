import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', () => {
  const showNavBar = ref(true);
  const user = ref({
    id: 0 as number,
    email: '' as string,
    name: '' as string
  });
  const token = ref({
    token: '' as string
  })

  function $reset() {
    user.value = {
      id: 0,
      email: '',
      name: ''
    };
    token.value = {
      token: ''
    }
  }

  return { showNavBar, user, $reset };
})