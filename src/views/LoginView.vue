<script setup lang="ts">
  import { useMainStore } from '@/stores/main';
  import { useField, useForm } from 'vee-validate';
  import { onBeforeMount, ref } from 'vue';

  const mainStore = useMainStore();
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
    console.log('value =>', value)
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
      <v-card-title class="mb-3 text-h4">Login Form</v-card-title>
      <v-card-text>
        <form name="loginForm" @submit.prevent="login">
          <v-text-field
            name="email"
            v-model="email.value.value"
            :error-messages="email.errorMessage.value"
            label="Email"
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
