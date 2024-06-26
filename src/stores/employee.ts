import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { IEmployeeCreateRequest, IEmployeeEditRequest, IEmployees } from './types';
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
  const employeeData = ref<IEmployees>();
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
  const getEmployeeFromExistingList = (id: number) => {
    if (employees.value && employees.value.length < 1) return false;
    const searchExistingById = employees.value.find(item => item.id === id);
    if (!searchExistingById) return false;
    employeeData.value = searchExistingById;
    return true;
  }
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
  };
  const createEmployeeData = async (input: IEmployeeCreateRequest) => {
    try {
      console.log('[REQ] createEmployeeData', input)
      const response = await server.post('/employee', input, {
        headers: {
          'Authorization': `Bearer ${mainStore.token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('[RES] createEmployeeData', response.data);
      return response.data;
    } catch (error) {
      console.log('[ERR] createEmployeeData', error);
      throw error;
    }
  }
  const editEmployeeData = async (input: IEmployeeEditRequest) => {
    try {
      console.log('[REQ] editEmployeeData', input)
      const response = await server.put('/employee', input, {
        headers: {
          'Authorization': `Bearer ${mainStore.token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('[RES] editEmployeeData', response.data);
      return response.data;
    } catch (error) {
      console.log('[ERR] editEmployeeData', error);
      throw error;
    }
  }
  const deleteEmployeeData = async (id: number) => {
    try {
      const input = {
        id
      }
      console.log('[REQ] deleteEmployeeData', input)
      const response = await server.delete('/employee', {
        headers: {
          'Authorization': `Bearer ${mainStore.token}`,
          'Content-Type': 'application/json'
        },
        data: input
      });
      console.log('[RES] deleteEmployeeData', response.data);
      return response.data;
    } catch (error) {
      console.log('[ERR] deleteEmployeeData', error);
      throw error;
    }
  }

  return { 
    employees,
    search,
    employeeData,
    $reset, 
    fetchEmployeeList,
    createEmployeeData,
    editEmployeeData,
    getEmployeeFromExistingList,
    deleteEmployeeData
  };
})