import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAllRefData, refDataRecord } from 'utilities';

interface AuthContextType {
  isAuthenticated: boolean;
  adminName: string;
  login: (name: string, password: string) => boolean;
  logout: () => void;
  skipAuth: (adminName: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminName, setAdminName] = useState('');
  const [refData, setRefData] = useState<refDataRecord[]>([]);
  const [websiteOptions, setWebsiteOptions] = useState<string[]>([]);

  // Load refData and auth state on mount
  useEffect(() => {
    const loadRefData = async () => {
      const stored = localStorage.getItem('refData');
      if (stored) {
        setRefData(JSON.parse(stored));
      } else {
        const data = await getAllRefData();
        localStorage.setItem('refData', JSON.stringify(data));
        setRefData(data);
        const options = Array.from(new Set(data.map(item => item.webPage))).sort();
        setWebsiteOptions(options);
        localStorage.setItem('websiteOptions', JSON.stringify(options))    };
      }

    loadRefData();

    // Load auth state
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      const { name, authenticated } = JSON.parse(storedAuth);
      setAdminName(name);
      setIsAuthenticated(authenticated);
    }
  }, []);

  const login = (name: string, password: string): boolean => {
    // Make sure refData is loaded before checking
    if (refData.length === 0) return false;

    const refItem = refData.find((item) => item.refKey === 'SD035');
    const valid = refItem?.value === password;
    if (valid) {
      setAdminName(name);
      setIsAuthenticated(true);
      localStorage.setItem('auth', JSON.stringify({ name, authenticated: true }));
    }
    return valid;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdminName('');
    localStorage.removeItem('auth');
  };

  const skipAuth = (name: string) => {
    setAdminName(name);
    setIsAuthenticated(true);
    localStorage.setItem('auth', JSON.stringify({ name, authenticated: true }));
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, adminName, login, logout, skipAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
