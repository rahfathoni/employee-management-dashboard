import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Vuetify
import { createVuetify } from 'vuetify' 
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { useMainStore } from './stores/main'

const app = createApp(App)
const vuetify = createVuetify({
  components,
  directives
})

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')

const mainStore = useMainStore();
const userLoggedIn = localStorage.getItem('user');
const tokenLoggedIn = localStorage.getItem('token');
if (userLoggedIn && tokenLoggedIn) {
  try {
    const userObject = JSON.parse(userLoggedIn);
    if (userObject && userObject.email) {
      mainStore.$patch((state) => {
        state.user = userObject;
        state.token = tokenLoggedIn;
      });
    }
  } catch (error) {
    console.error('Failed to get user data from localStorage:', error);
  }
}
