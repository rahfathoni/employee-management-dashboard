import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { UserLoginRequest } from './types';
import server from '@/api/index';

export const useMainStore = defineStore('main', () => {
  const showNavBar = ref(true);
  const user = ref({
    id: 0 as number,
    email: '' as string,
    name: '' as string
  });
  const token = ref('' as string);

  const $reset = () => {
    user.value = {
      id: 0,
      email: '',
      name: ''
    };
    token.value = '';
  }
  const loginUser = async (input: UserLoginRequest) => {
    try {
      console.log('[REQ] loginUser', input);
      const response = await server.post('/auth/login', input);
      console.log('[RES] loginUser', response.data);
      token.value = response.data.data.token;
      localStorage.setItem('token', response.data.data.token);
      const userData = {
        id: response.data.data.user_data.id,
        email: response.data.data.user_data.email,
        name: response.data.data.user_data.name
      };
      user.value = userData;
      localStorage.setItem('user', JSON.stringify(userData));
      showNavBar.value = true;
      return response.data;
    } catch (error) {
      console.log('[ERR] loginUser', error);
      throw error;
    }
  }
  const logoutUser = async () => {
    try {
      const response = await server.post('/auth/logout', {}, {
        headers: {
          'Authorization': `Bearer ${token.value}`
        }
      });
      console.log('[RES] logoutUser', response.data);
      return response.data;
    } catch (error) {
      console.log('[ERR] logoutUser', error);
      throw error;
    }
  }

  return { 
    showNavBar,
    token, 
    user, 
    $reset, 
    loginUser,
    logoutUser 
  };
})