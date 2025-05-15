import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check if user is logged in on page load
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('http://localhost:5000/api/auth/me', {
          credentials: 'include'
        });
        const data = await res.json();
        if (res.ok) setUser(data.user);
      } catch (err) {
        console.error('Auth check failed:', err);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  // Login handler
  const login = async (email, password) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await res.json();
      setUser(data.user);

      // Redirect based on role
      if (data.user.role === 'admin') {
        router.push('/admin');
      } else if (data.user.role === 'restaurant_owner') {
        router.push('/dashboard');
      } else {
        router.push('/');
      }
    } catch (err) {
      console.error('Login error:', err);
      throw err;
    }
  };

  // Logout handler
  const logout = async () => {
    await fetch('http://localhost:5000/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });
    setUser(null);
    router.push('/auth');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};