<script setup lang="ts">
  import { useEmployeeStore } from '@/stores/employee';
  import { onMounted, reactive } from 'vue';
  import PopNotif from '@/components/PopNotif.vue';
  import { useRouter } from 'vue-router';
  import { storeToRefs } from 'pinia';

  const router = useRouter();
  const employeeStore = useEmployeeStore();
  const { fetchEmployeeList } = employeeStore;
  const { employees } = storeToRefs(employeeStore);
  
  const snackbar = reactive({
    show: false,
    text: '',
    color: '',
    timeout: 3000
  });

  onMounted(async () => {
    employeeStore.$reset();
    try {
      await fetchEmployeeList();
    } catch (err: any) {
      if (err.response.status === 401) {
        router.push({ path: '/login' });
      } else {
        snackbar.text = "Error. Plase try again later";
        snackbar.color = "error";
      }
      snackbar.show = true;
    }
  });

  const closePopup = (val: boolean) => {
    snackbar.show = val;
  };
</script>

<template>
  <main id="employeePage">
    <section class="d-flex align-center justify-space-between py-3">
      <h1 name="subtitle" class="font-weight-medium">
        Employee List
      </h1>
      <v-btn 
        name="btnToAddEmployee"
        to="/employee/add" 
        color="primary"
        prepend-icon="mdi-plus-thick"
      >
        <span class="font-weight-bold">New Employee</span>
      </v-btn>
    </section>
    <section>
      table here
      {{ employees }}
    </section>

    <PopNotif
      v-model="snackbar.show"
      :text="snackbar.text"
      :color="snackbar.color"
      :timeout="snackbar.timeout"
      @closeShow="closePopup"
    />
  </main>
</template>
