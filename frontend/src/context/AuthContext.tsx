import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { API_URL } from '../config';

export type UserRole = 'USER' | 'ENTREPRENEUR' | 'INVESTOR' | 'ADMIN' | 'MENTOR' | 'APPLICANT' | 'PARTNER';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'ACTIVE' | 'PENDING' | 'SUSPENDED';
  isDemo: boolean;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        try {
          const res = await fetch(`${API_URL}/api/auth/me`, {
            headers: { Authorization: `Bearer ${storedToken}` }
          });
          if (res.ok) {
            const userData = await res.json();
            setUser(userData);
          } else {
            // Token invalid or expired
            localStorage.removeItem('token');
            setToken(null);
          }
        } catch (err) {
          console.error("Failed to fetch user", err);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  const updateUser = (newUser: User) => {
    setUser(newUser);
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout, updateUser }}>
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
