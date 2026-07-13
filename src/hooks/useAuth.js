import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

const CREDENTIALS = { username: 'admin', password: 'pearl2026' };

export function useAuth() {
  const [auth, setAuth] = useLocalStorage('pearl_auth', { isLoggedIn: false, user: null });

  const login = useCallback((username, password) => {
    if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
      setAuth({
        isLoggedIn: true,
        user: { username, name: 'Pearl Admin', role: 'manager', lastLogin: new Date().toISOString() },
      });
      return { success: true };
    }
    return { success: false, error: 'Invalid username or password' };
  }, [setAuth]);

  const logout = useCallback(() => {
    setAuth({ isLoggedIn: false, user: null });
  }, [setAuth]);

  return { isLoggedIn: auth.isLoggedIn, user: auth.user, login, logout };
}