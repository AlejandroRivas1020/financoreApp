import apiFinancore from '../api/Api-Financore';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  phone: string;
  profilePicture: string;
  recoveryCode?: string | null;
  recoveryCodeExpires?: string | null;
}


const getUserById = async (): Promise<User> => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No token found');
    }

    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const userId = decodedToken.id || decodedToken.userId;

    if (!userId) {
      throw new Error('User ID not found in token');
    }

    const response = await apiFinancore.get<User>(`/users/${userId}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching user by ID:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch user data');
  }
};


export default {
  getUserById,
};
