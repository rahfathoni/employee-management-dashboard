import axios from 'axios';
import type { AxiosInstance } from 'axios';

const server: AxiosInstance = axios.create({
  baseURL: 'https://api-interview-vue.bayarind.id/api'
});

export default server;