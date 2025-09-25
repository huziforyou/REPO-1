import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (token) => {
    localStorage.setItem('token', token);
    fetchUser(); // fetch fresh user from backend
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        setUser(res.data.user);
      }
    } catch (err) {
      console.error('Failed to fetch user:', err) ;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser(); // on first load
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
