import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { IDepartments, IJobPositions } from './types';
import server from '@/api/index';
import { useMainStore } from './main';

export const useReferenceStore = defineStore('reference', () => {
  const departments = ref<IDepartments[]>([]);
  const jobPositions = ref<IJobPositions[]>([]);
  const mainStore = useMainStore();

  const $reset = () => {
    departments.value = [];
    jobPositions.value = [];
  };
  const fetchDepartmentList = async () => {
    try {
      console.log('[REQ] fetchDepartmentList');
      const response = await server.get('/departement/list', {
        headers: {
          'Authorization': `Bearer ${mainStore.token}`
        }
      });
      console.log('[RES] fetchDepartmentList', response.data);
      departments.value = response.data.data;
      return response.data;
    } catch (error) {
      console.error('[ERR] fetchDepartmentList', error);
      throw error;
    }
  }
  const fetchJobPositionList = async () => {
    try {
      console.log('[REQ] fetchJobPositionList');
      const response = await server.get('/position/list', {
        headers: {
          'Authorization': `Bearer ${mainStore.token}`
        }
      });
      console.log('[RES] fetchJobPositionList', response.data);
      jobPositions.value = response.data.data;
      return response.data;
    } catch (error) {
      console.error('[ERR] fetchJobPositionList', error);
      throw error;
    }
  }

  return { 
    departments,
    jobPositions,
    $reset, 
    fetchDepartmentList,
    fetchJobPositionList
  };
})