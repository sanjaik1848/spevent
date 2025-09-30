"use client";

import { useState, useEffect, createContext, useContext } from 'react';

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default admin credentials
const ADMIN_CREDENTIALS = {
  email: "your-admin@admin.com",
  password: "your-SP@1234",
  name: "Your Name"
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    if (typeof window !== 'undefined') {
      try {
        const isAuthenticated = localStorage.getItem('admin_authenticated');
        const savedUser = localStorage.getItem('admin_user');
        
        console.log('Auth check:', { isAuthenticated, savedUser });
        
        if (isAuthenticated === 'true' && savedUser) {
          const userData = JSON.parse(savedUser);
          console.log('User data found:', userData);
          setUser({
            email: userData.email,
            name: userData.name
          });
        } else {
          console.log('No authentication found');
        }
      } catch (error) {
        console.error('Failed to parse saved user data:', error);
        localStorage.removeItem('admin_authenticated');
        localStorage.removeItem('admin_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simple credential check (in production, this would be an API call)
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const userData: User = {
        email: ADMIN_CREDENTIALS.email,
        name: ADMIN_CREDENTIALS.name
      };
      
      setUser(userData);
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('adminUser', JSON.stringify(userData));
      }
      
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_authenticated');
      localStorage.removeItem('admin_user');
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user
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
