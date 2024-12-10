import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  getToken: () => Promise<string | null>;
  register: (name: string, email: string, password: string, phone: string, file: any ) => Promise<void>;
  loading: boolean;
  forgotPassword: (email: string) => Promise<void>;
  validateRecoveryCode: (code: string) => Promise<void>;
  resetPassword: (newPassword: string) => Promise<void>;
  recoveryEmail: string;
  setRecoveryEmail: (email: string) => void;
  recoveryCode: string;
  setRecoveryCode: (code: string) => void;
}


const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoveryCode, setRecoveryCode] = useState('');

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await authService.getToken();
      setIsAuthenticated(!!token);
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const success = await authService.login({ email, password });
    if (success) {
      setIsAuthenticated(true);
    }
    return success;
  };

  const logout = async (): Promise<void> => {
    await authService.logout();
    setIsAuthenticated(false);
  };

  const getToken = async (): Promise<string | null> => {
    return await authService.getToken();
  };

  const register = async (name: string, email: string, password: string, phone: string, file: any): Promise<void> => {
    try {
      const message = await authService.register({ name, email, password , phone ,file  });
      if (message === 'User registered successfully') {
      }
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const forgotPassword = async (email: string): Promise<void> => {
    await authService.forgotPassword(email);
    setRecoveryEmail(email);
  };

  const validateRecoveryCode = async (code: string): Promise<void> => {
    await authService.validateRecoveryCode(recoveryEmail, code);
    setRecoveryCode(code);
  };

  const resetPassword = async (newPassword: string): Promise<void> => {
    await authService.resetPassword(recoveryEmail, recoveryCode, newPassword);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      login,
      logout,
      getToken,
      loading,
      register,
      forgotPassword,
      validateRecoveryCode,
      resetPassword,
      recoveryEmail,
      setRecoveryEmail,
      recoveryCode,
      setRecoveryCode,
      }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
