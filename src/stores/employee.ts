import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { IEmployees } from './types';
import server from '@/api/index';
import { useMainStore } from './main';

export const useEmployeeStore = defineStore('employee', () => {
  const employees = ref<IEmployees[]>([]);
  const search = ref({
    limit: 10 as number,
    search: '' as string,
    total: 0 as number,
    current_page: 0 as number,
    total_page: 0 as number
  });
  const mainStore = useMainStore();

  const $reset = () => {
    employees.value = [];
    search.value = {
      limit: 10,
      search: '',
      total: 0,
      current_page: 0,
      total_page: 0
    };
  };
  const fetchEmployeeList = async () => {
    const request = {
      page: search.value.current_page,
      limit: search.value.limit,
      search: search.value.search
    };
    try {
      console.log('[REQ] fetchEmployeeList', request);
      const response = await server.get('/employee', {
        headers: {
          'Authorization': `Bearer ${mainStore.token}`
        },
        params: request
      });
      console.log('[RES] fetchEmployeeList', response.data);
      search.value = {
        ...search.value,
        total: response.data.data.total,
        current_page: response.data.data.current_page,
        total_page: response.data.data.total_page,
      }
      employees.value = response.data.data.list;
      return response.data;
    } catch (error) {
      console.error('[ERR] fetchEmployeeList', error);
      throw error;
    }
  }
  // TODO : create, edit, delete employee

  return { 
    employees,
    search,
    $reset, 
    fetchEmployeeList,
  };
})