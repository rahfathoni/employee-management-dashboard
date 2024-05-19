<script setup lang="ts">
  import type { IEmployees } from '@/stores/types';

  defineProps<{
    data: IEmployees;
  }>();

  const formatGender = (gender: string) => {
    if (gender === 'male') {
      return 'Male'
    }
    if (gender === 'female') {
      return 'Female'
    }
    return '-'
  }
  const formatDateOfBirth = (dateOfBirth: string) => {
    if (dateOfBirth) {
      const date = new Date(dateOfBirth);
      const day = date.getDate();
      const month = date.toLocaleString('en-US', { month: 'long' });
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    }
    return '-'
  }
</script>

<template>
  <article name="detailInformation" class="text-black-alter text-18px-custome">
    <v-row>
      <v-col class="pt-0" cols="12" sm="4">
        <label>
          Employee ID
        </label>
      </v-col>
      <v-col class="pt-0" cols="12" sm="6">
        <p class="font-weight-bold">
          {{ data.id || '-' }}
        </p>
      </v-col>
    </v-row>
    <v-row class="pt-3">
      <v-col class="pt-0" cols="12" sm="4">
        <label>
          Name
        </label>
      </v-col>
      <v-col class="pt-0" cols="12" sm="6">
        <p class="font-weight-bold">
          {{ data.name || '-' }}
        </p>
      </v-col>
    </v-row>
    <v-row class="pt-3">
      <v-col class="pt-0" cols="12" sm="4">
        <label>
          Gender
        </label>
      </v-col>
      <v-col class="pt-0" cols="12" sm="6">
        <p class="font-weight-bold">
          {{ formatGender(data.gender) }}
        </p>
      </v-col>
    </v-row>
    <v-row class="pt-3">
      <v-col class="pt-0" cols="12" sm="4">
        <label>
          E-mail
        </label>
      </v-col>
      <v-col class="pt-0" cols="12" sm="6">
        <p class="font-weight-bold">
          {{ data.email || '-' }}
        </p>
      </v-col>
    </v-row>
    <v-row class="pt-3">
      <v-col class="pt-0" cols="12" sm="4">
        <label>
          Phone
        </label>
      </v-col>
      <v-col class="pt-0" cols="12" sm="6">
        <p class="font-weight-bold">
          {{ data.phone || '-' }}
        </p>
      </v-col>
    </v-row>
    <v-row class="pt-3">
      <v-col class="pt-0" cols="12" sm="4">
        <label>
          Date of Birth
        </label>
      </v-col>
      <v-col class="pt-0" cols="12" sm="6">
        <p class="font-weight-bold">
          {{ formatDateOfBirth(data.date_of_birth) }}
        </p>
      </v-col>
    </v-row>
    <v-row class="pt-3">
      <v-col class="pt-0" cols="12" sm="4">
        <label>
          Address
        </label>
      </v-col>
      <v-col class="pt-0" cols="12" sm="6">
        <p class="font-weight-bold">
          {{ data.address || '-' }}
        </p>
      </v-col>
    </v-row>
    <v-row class="pt-3">
      <v-col class="pt-0" cols="12" sm="4">
        <label>
          Department
        </label>
      </v-col>
      <v-col class="pt-0" cols="12" sm="6">
        <p class="font-weight-bold">
          {{ data.departement || '-' }}
        </p>
      </v-col>
    </v-row>
    <v-row class="pt-3">
      <v-col class="pt-0" cols="12" sm="4">
        <label>
          Position
        </label>
      </v-col>
      <v-col class="pt-0" cols="12" sm="6">
        <p class="font-weight-bold">
          {{ data.position || '-' }}
        </p>
      </v-col>
    </v-row>
  </article>
</template>