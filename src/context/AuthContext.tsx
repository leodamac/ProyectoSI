'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';
import { validateCredentials, getUserById, updateUserPremiumStatus } from '@/data/users';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isProfessional: () => boolean;
  isInstitution: () => boolean;
  isPremium: () => boolean;
  upgradeToPremium: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'alkadami-auth-user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        // Verify user still exists in our mock data
        const validUser = getUserById(parsedUser.id);
        if (validUser) {
          setUser(validUser);
        } else {
          // User no longer exists, clear storage
          localStorage.removeItem(AUTH_STORAGE_KEY);
        }
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const validatedUser = validateCredentials(email, password);
      
      if (!validatedUser) {
        return { 
          success: false, 
          error: 'Credenciales inválidas. Por favor verifica tu correo y contraseña.' 
        };
      }
      
      setUser(validatedUser);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: 'Ocurrió un error al iniciar sesión. Por favor intenta nuevamente.' 
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const isProfessional = (): boolean => {
    return user?.role === 'professional';
  };

  const isInstitution = (): boolean => {
    return user?.role === 'institution';
  };

  const isPremium = (): boolean => {
    return user?.isPremium === true;
  };

  const upgradeToPremium = async (): Promise<boolean> => {
    if (!user) {
      return false;
    }

    try {
      // In a real application, this would make an API call to process payment
      // For now, we just update the user status in our mock data
      const updatedUser = updateUserPremiumStatus(user.id, true);
      
      if (updatedUser) {
        setUser(updatedUser);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error upgrading to premium:', error);
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    isProfessional,
    isInstitution,
    isPremium,
    upgradeToPremium
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
