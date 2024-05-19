<script setup lang="ts">
  import { useMainStore } from '@/stores/main';
  import { useField, useForm } from 'vee-validate';
  import { onBeforeMount, ref } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const mainStore = useMainStore();
  const { loginUser, showNotification } = mainStore;
  onBeforeMount(() => {
    mainStore.$reset();
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  });
  
  const isPasswordShow = ref(false);
    
  const { handleSubmit } = useForm({
    validationSchema: {
      email (value: string) {
        if (value) return true;
        return 'Email must be filled'
      },
      password (value: string) {
        if (value) return true;
        return 'Password must be filled'
      }
    }
  })
  const email = useField('email');
  const password = useField('password');

  const login = handleSubmit(async (value) => {
    try {
      const response = await loginUser({
        email: value.email,
        password: value.password
      });
      if (response.status === true) {
        router.push({ path: '/employee' });
        showNotification('Welcome to Employee Management Dashboard', 'info');
      }
    } catch (err: any) {
      if (err.response.status === 401) {
        showNotification('Unauthorized. HINT: try username-password from example', 'warning', 3000);
      } else {
        showNotification('Error. Plase try again later', 'error');
      }
    }
  })
</script>

<template>
  <main id="LoginPage" class="d-flex flex-column flex-nowrap justify-center h-screen bg-ghost-white">
    <section class="d-flex align-center justify-center">
      <h1 name="title" class="text-h2 font-weight-bold px-5">
        Employee Management Dashboard
      </h1>
    </section>
    <v-card name="loginContainer" class="mx-auto mt-7" min-width="500">
      <v-card-title class="mb-3 text-h4 text-black-alter">Login Form</v-card-title>
      <v-card-text>
        <form name="loginForm" @submit.prevent="login">
          <v-text-field
            name="email"
            v-model="email.value.value"
            :error-messages="email.errorMessage.value"
            label="E-mail"
            variant="outlined"
            hint="example: user.test@bayarind.id"
            persistent-hint
            class="mb-4"
            type="email"
            ></v-text-field>

          <v-text-field
            name="password"
            v-model="password.value.value"
            :error-messages="password.errorMessage.value"
            label="Password"
            :append-icon="isPasswordShow ? 'mdi-eye' : 'mdi-eye-off'"
            :type="isPasswordShow ? 'text' : 'password'"
            @click:append="isPasswordShow = !isPasswordShow"
            variant="outlined"
            hint="example: password"
            persistent-hint
            class="mb-4"
          ></v-text-field>

          <v-btn
            name="loginButton"
            type="submit"
            block
            color="primary"
          >
            Login
          </v-btn>
        </form>
      </v-card-text>
    </v-card>
  </main>
</template>
