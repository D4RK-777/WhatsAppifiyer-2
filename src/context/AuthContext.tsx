import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials, RegisterCredentials } from '../types/auth';

// Define the context type
interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage keys
const USER_STORAGE_KEY = 'whatsappifiyer_user';
const AUTH_TOKEN_KEY = 'whatsappifiyer_auth_token';

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Check for existing user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    const token = localStorage.getItem(AUTH_TOKEN_KEY);

    if (storedUser && token) {
      try {
        const user = JSON.parse(storedUser);
        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'Failed to authenticate',
        });
      }
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful login
      const user: User = {
        id: '1',
        username: credentials.email.split('@')[0],
        email: credentials.email,
      };

      // Store user and token
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      localStorage.setItem(AUTH_TOKEN_KEY, 'demo-token');

      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: 'Login failed. Please check your credentials.',
      });
    }
  };

  // Register function
  const register = async (credentials: RegisterCredentials): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful registration
      const user: User = {
        id: Date.now().toString(),
        username: credentials.username,
        email: credentials.email,
      };

      // Store user and token
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      localStorage.setItem(AUTH_TOKEN_KEY, 'demo-token');

      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: 'Registration failed. Please try again.',
      });
    }
  };

  // Logout function
  const logout = (): void => {
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);

    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  // Context value
  const value = {
    ...state,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
