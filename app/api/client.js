import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://192.168.0.103:8000/api',
});

export default apiClient;
