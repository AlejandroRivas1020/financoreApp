import AsyncStorage from '@react-native-async-storage/async-storage';
import apiFinancore from '../api/Api-Financore';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  file: any;
}

const AUTH_TOKEN_KEY = 'accessToken';

const authService = {
  login: async (loginData: LoginData): Promise<boolean> => {
    try {
      const response = await apiFinancore.post('/auth/login', loginData);
      const token = response.data.accessToken;

      await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);

      return true;
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  },

  getToken: async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  logout: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  },

  register: async (registerData: RegisterData): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('name', registerData.name);
      formData.append('email', registerData.email);
      formData.append('password', registerData.password);
      formData.append('phone', registerData.phone);

      if (registerData.file) {
        formData.append('file', {
          uri: registerData.file.uri,
          type: registerData.file.type || 'image/jpeg',
          name: registerData.file.fileName || 'profile.jpg',
        });
      }

      const response = await apiFinancore.post('/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data.message;
    } catch (error: any) {
      console.error('Error during registration:', error);
      throw error.response?.data?.message || 'Registration failed';
    }
  },

  forgotPassword: async (email: string): Promise<void> => {
    try {
      await apiFinancore.post('/auth/forgot-password', { email });
    } catch (error: any) {
      console.error('Error during forgot password:', error);
      throw error.response?.data?.message || 'Failed to send recovery code';
    }
  },

  validateRecoveryCode: async (email: string, token: string): Promise<void> => {
    try {
      await apiFinancore.post('/auth/validate-recovery-code', { email, token });
    } catch (error: any) {
      console.error('Error during validation:', error);
      throw error.response?.data?.message || 'Invalid recovery code';
    }
  },

  resetPassword: async (email: string, token: string, newPassword: string): Promise<void> => {
    try {
      await apiFinancore.post('/auth/reset-password', { email, token, newPassword });
    } catch (error: any) {
      console.error('Error during password reset:', error);
      throw error.response?.data?.message || 'Failed to reset password';
    }
  },
};

export default authService;
