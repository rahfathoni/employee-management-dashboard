<script setup lang="ts">
  import { useEmployeeStore } from '@/stores/employee';
  import { useMainStore } from '@/stores/main';
  import { useReferenceStore } from '@/stores/reference';
  import { formatDate } from '@/utils';
  import { storeToRefs } from 'pinia';
  import { useField, useForm } from 'vee-validate';
  import { onMounted, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  
  const route = useRoute();
  const router = useRouter();
  const mainStore = useMainStore();
  const { showNotification } = mainStore;
  const referenceStore = useReferenceStore();
  const { fetchDepartmentList, fetchJobPositionList, } = referenceStore;
  const { departments, jobPositions } = storeToRefs(referenceStore);
  const employeeStore = useEmployeeStore();
  const { getEmployeeFromExistingList, editEmployeeData, deleteEmployeeData } = employeeStore;
  const { employeeData } = storeToRefs(employeeStore);
  const today = ref(new Date().toISOString().substr(0, 10));
  const deleteDialog = ref(false);

  const { handleSubmit } = useForm({
    validationSchema: {
      name (value: string) {
        if (value?.length >= 2) return true;
        return 'Name needs to be at least 2 characters.';
      },
      gender (value: string) {
        if (value) return true;
        return 'Gender must be filled';
      },
      email (value: string) {
        if (value) return true;
        return 'Email must be filled';
      },
      phone (value: string) {
        if (value?.length > 7 && /[0-9-]+/.test(value)) return true;
        return 'Phone number needs to be at least 7 digits.'
      },
      dateOfBirth (value: any) {
        if (value) return true;
        return 'Date of Birth must be filled';
      },
      address (value: string) {
        if (value?.length >= 2) return true;
        return 'Address needs to be at least 2 characters.';
      },
      department (value: number) {
        if (value) return true;
        return 'Department must be filled';
      },
      jobPosition (value: number) {
        if (value) return true;
        return 'Position must be filled';
      },
    },
  });
  const name = useField('name');
  const gender = useField('gender');
  const email = useField('email');
  const phone = useField('phone');
  const dateOfBirth = useField('dateOfBirth');
  const address = useField('address');
  const department = useField('department');
  const jobPosition = useField('jobPosition');

  const setInitialEmployeeData = () => {
    mainStore.loadingOverlay = true;
    if (employeeData.value) {
      name.value.value = employeeData.value.name || '';
      gender.value.value = employeeData.value.gender || '';
      email.value.value = employeeData.value.email || '';
      phone.value.value = employeeData.value.phone || '';
      dateOfBirth.value.value = new Date(employeeData.value.date_of_birth) || '';
      address.value.value = employeeData.value.address || '';
  
      const findDepartment = referenceStore.departments.find((item: any) => item.title === employeeData.value?.departement);
      department.value.value = findDepartment?.id || '';        
      
      const findJobPosition = referenceStore.jobPositions.find((item: any) => item.title === employeeData.value?.position);
      jobPosition.value.value = findJobPosition?.id || '';
    }
    mainStore.loadingOverlay = false;
  }

  onMounted(async () => {
    mainStore.loadingOverlay = true;
    try {
      let getEmployeeData = getEmployeeFromExistingList(parseInt(route.params.id as string));
      if (!getEmployeeData) router.push({ path: '/employee' });
      await fetchDepartmentList();
      await fetchJobPositionList();
      console.log('[CHECK] employeeData', employeeData.value)
      setInitialEmployeeData();
      mainStore.loadingOverlay = false;
    } catch (err: any) {
      mainStore.loadingOverlay = false;
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
  });

  const submit = handleSubmit( async (values) => {
    if (employeeData.value) {
      mainStore.loadingOverlay = true;
      let formattingDate = formatDate(new Date(values.dateOfBirth));
      const newInput = {
        id: employeeData.value.id,
        name: values.name,
        gender: values.gender,
        email: values.email,
        phone: values.phone,
        date_of_birth: formattingDate,
        address: values.address,
        department_id: values.department,
        job_position_id: values.jobPosition
      }
      try {
        let response = await editEmployeeData(newInput);
        if (response.status) {
          router.push({ path: '/employee' });
          showNotification('Updated employee data success', 'success');
        }
        mainStore.loadingOverlay = false;
      } catch (err: any) {
        mainStore.loadingOverlay = false;
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
  });
  const phoneInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '');
    phone.value.value = input.value;
  };
  const backToMain = () => {
    router.push({ path: '/employee' });
  }
  const deleteEmployee = async () => {
    if(employeeData.value) {
      mainStore.loadingOverlay = true;
      try {
        let response = await deleteEmployeeData(employeeData.value?.id);
        if (response.status) {
          router.push({ path: '/employee' });
          showNotification('Deleted employee data success', 'success');
        }
        mainStore.loadingOverlay = false;
      } catch (err: any) {
        mainStore.loadingOverlay = false;
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
  }
</script>

<template>
  <main id="detailEmployeePage" class="">
    <section class="d-flex align-center justify-space-between py-3">
      <h1 name="subtitle" class="font-weight-medium">
        Employee Detail
      </h1>
    </section>
    <form name="editEmployeeForm" @submit.prevent="submit">
      <v-text-field
        name="nameField"
        v-model="name.value.value"
        :error-messages="name.errorMessage.value"
        label="Name"
        autocomplete="off"
      ></v-text-field>
      <v-radio-group 
        name="genderField"
        v-model="gender.value.value"
        :error-messages="gender.errorMessage.value"
        :error="!gender.errorMessage.value === true ? false : true"
        label="Gender"
        color="success"
        class="mt-2"
        inline
      >
        <v-radio class="mr-4" label="Male" value="male"></v-radio>
        <v-radio label="Female" value="female"></v-radio>
      </v-radio-group>
      <v-text-field
        name="emailField"
        v-model="email.value.value"
        :error-messages="email.errorMessage.value"
        label="E-mail"
        type="email"
        autocomplete="off"
        class="mt-2"
      ></v-text-field>
      <v-text-field
        name="phoneField"
        v-model="phone.value.value"
        :error-messages="phone.errorMessage.value"
        label="Phone"
        class="mt-2"
        autocomplete="off"
        @input="phoneInput"
      ></v-text-field>
      <v-date-input
        name="dateOfBirthField"
        v-model="dateOfBirth.value.value"
        :error-messages="dateOfBirth.errorMessage.value"
        label="Date of Birth"
        class="mt-2"
        autocomplete="off"
        prepend-icon=""
        :max="today"
      ></v-date-input>
      <v-text-field
        name="addressField"
        v-model="address.value.value"
        :error-messages="address.errorMessage.value"
        label="Address"
        autocomplete="off"
        class="mt-2"
      ></v-text-field>
      <v-autocomplete
        name="departmentField"
        v-model="department.value.value"
        :error-messages="department.errorMessage.value"
        :items="departments"
        item-value="id"
        item-title="title"
        label="Department"
        class="mt-2"
        autocomplete="off"
      ></v-autocomplete>
      <v-autocomplete
        name="jobPositionField"
        v-model="jobPosition.value.value"
        :error-messages="jobPosition.errorMessage.value"
        :items="jobPositions"
        item-value="id"
        item-title="title"
        label="Position"
        class="mt-2"
        autocomplete="off"
      ></v-autocomplete>
      <v-row no-gutters class="mt-2">
        <v-col class="px-5 pb-2">
          <v-btn
            class="me-8"
            block
            prepend-icon="mdi-arrow-left-bold"
            color="black"
            @click=backToMain
          >
            Back
          </v-btn>
        </v-col>
        <v-col class="px-5 pb-2">
          <v-btn
            block
            class="me-8"
            type="submit"
            prepend-icon="mdi-pencil"
            color="success"
          >
            Edit
          </v-btn>
        </v-col>
        <v-col class="px-5 pb-2">
          <v-btn
            block
            prepend-icon="mdi-autorenew"
            color="warning"
            @click="setInitialEmployeeData"
          >
            Reset
          </v-btn>
        </v-col>
        <v-col class="px-5 pb-2">
          <v-btn
            block
            color="error"
            @click="deleteDialog = true"
            prepend-icon="mdi-delete-forever"
            >
            Delete
          </v-btn>
        </v-col>
      </v-row>
    </form>
    <v-dialog
      v-model="deleteDialog"
      width="auto"
    >
      <v-card
        max-width="600"
        prepend-icon="mdi-delete-forever"
        color="error"
        class="pb-5 pt-2 px-5"
        text="Are you sure you want to delete this employee data?"
        title="Delete Employee Data"
        >
        <template v-slot:actions>
          <v-btn
            variant="outlined"
            class="me-8"
            text="Delete"
            @click="deleteEmployee"
            ></v-btn>
          <v-btn
            variant="outlined"
            class=""
            text="Close"
            color="black"
            @click="deleteDialog = false"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </main>
</template>
