import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiFinancore = axios.create({
  baseURL: 'https://api-financore.onrender.com/api',
  timeout: 10000,
});

apiFinancore.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiFinancore;
