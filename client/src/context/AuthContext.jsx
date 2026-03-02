import { createContext, useContext, useState, useEffect } from 'react';
import { getMe, logout as logoutApi } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const { data } = await getMe();
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await logoutApi();
    } catch {
      // ignore
    }
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const { data } = await getMe();
      setUser(data.user);
    } catch {
      // silent fail
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, refreshUser, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
