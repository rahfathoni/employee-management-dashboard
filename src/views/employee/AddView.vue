<script setup lang="ts">
  import { useEmployeeStore } from '@/stores/employee';
  import { useReferenceStore } from '@/stores/reference';
  import { formatDate } from '@/utils';
  import { storeToRefs } from 'pinia';
  import { useField, useForm } from 'vee-validate';
  import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const referenceStore = useReferenceStore();
  const { fetchDepartmentList, fetchJobPositionList, } = referenceStore;
  const { departments, jobPositions } = storeToRefs(referenceStore);
  const employeeStore = useEmployeeStore();
  const { createEmployeeData } = employeeStore;
  const today = ref(new Date().toISOString().substr(0, 10));
  // const menuDate = ref(false);

  onMounted(async () => {
    try {
      await fetchDepartmentList();
      await fetchJobPositionList();
    } catch (err: any) {
      if (err.response.status === 401) {
        router.push({ path: '/login' });
      }
    }
  });

  const { handleSubmit, handleReset } = useForm({
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
  const submit = handleSubmit( async (values) => {
    let formattingDate = formatDate(new Date(values.dateOfBirth));
    const input = {
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
      let response = await createEmployeeData(input);
      if (response.status) {
        router.push({ path: '/employee' })
      }
    } catch (err: any) {
      if (err.response.status === 401) {
        router.push({ path: '/login' });
      } 
      // else {
      //   snackbar.text = "Error. Plase try again later";
      //   snackbar.color = "error";
      // }
      // snackbar.show = true;
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
</script>

<template>
  <main id="addEmployeePage">
    <section class="d-flex align-center justify-space-between py-3">
      <h1 name="subtitle" class="font-weight-medium">
        Add Employee Form
      </h1>
    </section>
    <form name="addEmployeeForm" @submit.prevent="submit">
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
      <!-- Date picker method 1 -->
      <!-- <v-text-field
        name="dateOfBirthField"
        v-model="dateOfBirth.value.value"
        :error-messages="dateOfBirth.errorMessage.value"
        label="Date Of Birth"
        type="date"
        class="mt-2"
        autocomplete="off"
        :max="today"
      ></v-text-field> -->
      <!-- Date Picker method 2 -->
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
      <!-- Date Picker Method 3 <longest> -->
        <!-- <v-menu
          v-model="menuDate"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
          class="mt-2"
        >
          <template #activator="{ props }">
            <v-text-field
              v-model="dateOfBirth.value.value"
              :error-messages="dateOfBirth.errorMessage.value"
              label="Date of Birth"
              readonly
              v-bind="props"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="dateOfBirth.value.value"
            :max="today"
            @update:model-value="menuDate = false"
          ></v-date-picker>
        </v-menu> -->
      <!--  -->
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
            color="black"
            @click=backToMain
          >
            Back
          </v-btn>
        </v-col>
        <v-col class="px-5 pb-2">
          <v-btn
            block
            class="me-4"
            type="submit"
            color="success"
          >
            Submit
          </v-btn>
        </v-col>
        <v-col class="px-5 pb-2">          
          <v-btn 
            block 
            color="warning" 
            @click="handleReset"
          >
            Clear
          </v-btn>
        </v-col>
      </v-row>
    </form>
  </main>
</template>
