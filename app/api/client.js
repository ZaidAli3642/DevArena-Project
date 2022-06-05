import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://shielded-brook-95084.herokuapp.com/api',
});

export default apiClient;
