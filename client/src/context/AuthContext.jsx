import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api';

const Ctx = createContext();
export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      api
        .get('/auth/me')
        .then((r) => setUser(r.data))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false));
    } else setLoading(false);
  }, []);

  const login = (data) => {
    localStorage.setItem('token', data.token);
    setUser(data.user);
  };
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };
  const toggleFav = async (id) => {
    const r = await api.post(`/items/${id}/favourite`);
    setUser({ ...user, favourites: r.data });
  };

  return (
    <Ctx.Provider value={{ user, loading, login, logout, toggleFav }}>{children}</Ctx.Provider>
  );
}
