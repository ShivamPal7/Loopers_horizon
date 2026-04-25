import { useState, useEffect } from 'react';

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  joinedDate: string;
};

const AUTH_STORAGE_KEY = 'horizon_auth';

export function useAuthStore() {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse auth state', e);
      }
    }
    return null;
  });

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedUser));
  };

  return {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    updateProfile
  };
}
