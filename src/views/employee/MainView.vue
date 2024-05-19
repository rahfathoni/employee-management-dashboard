<script setup lang="ts">
  import { useEmployeeStore } from '@/stores/employee';
  import { onMounted, ref, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import { useMainStore } from '@/stores/main';

  const router = useRouter();
  const employeeStore = useEmployeeStore();
  const { fetchEmployeeList } = employeeStore;
  const { employees, search } = storeToRefs(employeeStore);
  const tableProps = ref<any[]>([
    { title: 'Employee ID', key: 'id', align: 'start', sortable: true },
    { title: 'Name', key: 'name', align: 'start', sortable: true },
    { title: 'Departement', key: 'departement', align: 'start', sortable: true },
    { title: 'Position', key: 'position', align: 'start', sortable: false },
    { title: 'Detail', key: 'detail', align: 'center', sortable: false },
  ]);
  const { showNotification } = useMainStore();
  
  const fetchEmployee = async () => {
    try {
      let response = await fetchEmployeeList();
      if (response.data.list && response.data.list.length === 0) {
        showNotification('No data available', 'info', 3000);
      }
    } catch (err: any) {
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

  onMounted(async () => {
    employeeStore.$reset();
    await fetchEmployee();
  });
  watch(() => search.value.current_page, async (newValue) => {
    if (newValue) {
      await fetchEmployee();
    }
  });
  watch(() => search.value.search, async () => {
    employeeStore.$patch((state) => {
      state.search.current_page = 1
    });
    await fetchEmployee();
  });
  const toDetailEmployee = (value: number) => {
    router.push({ path: `/employee/detail/${value}` });
  }
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
        <span class="font-weight-bold">Employee</span>
      </v-btn>
    </section>
    <section>
      <v-card flat>
        <template v-slot:text>
          <v-text-field
            v-model="search.search"
            label="Search by Name"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            hide-details
            validate-on="lazy"
            clearable
          ></v-text-field>
        </template>

        <v-data-table
          name="employeeTable"
          :headers ="tableProps"
          :items="employees"
          item-key="name"
          hide-default-footer
          :header-props="{ class: 'font-weight-bold text-h6' }"
        >
         <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template v-slot:item.detail="{ item }">
          <v-icon
            class=""
            size="large"
            icon="mdi-card-account-details"
            @click="toDetailEmployee(item.id)"
          >
          </v-icon>
        </template>
        <template v-slot:no-data>
          <h3 class="my-10">
            Data not found
          </h3>
          <v-btn
            color="primary"
            @click="fetchEmployee"
          >
            Reload
          </v-btn>
        </template>
        </v-data-table>
        <div class="text-center">
          <v-pagination
            v-model="search.current_page"
            :length="search.total_page"
            :total-visible="3"
          ></v-pagination>
        </div>
      </v-card>
    </section>
  </main>
</template>
