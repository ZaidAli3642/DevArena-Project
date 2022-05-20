import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://192.168.42.53:8000/api',
});

export default apiClient;
