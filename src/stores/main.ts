import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { IUserLoginRequest } from './types';
import server from '@/api/index';

export const useMainStore = defineStore('main', () => {
  const showNavBar = ref(true);
  const user = ref({
    id: 0 as number,
    email: '' as string,
    name: '' as string
  });
  const token = ref('' as string);
  const notification = ref({
    color: '' as string,
    timeout: 6000 as number,
    text: '' as string,
    show: false as boolean
  });

  const $reset = () => {
    user.value = {
      id: 0,
      email: '',
      name: ''
    };
    token.value = '';
  }

  const loginUser = async (input: IUserLoginRequest) => {
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
  const showNotification = (message: string = 'Something went wrong.', color: string = 'white', timeout: number = 6000) => {
    notification.value.text = message;
    notification.value.color = color;
    notification.value.timeout = timeout;
    notification.value.show = true;
  }
  const hideNotification = () => {
    notification.value.show = false;
    notification.value.text = '';
  }

  return { 
    showNavBar,
    token, 
    user, 
    notification,
    $reset, 
    loginUser,
    logoutUser,
    showNotification,
    hideNotification
  };
})