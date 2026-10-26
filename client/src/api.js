import axios from 'axios';

export const BASE = 'http://localhost:5000';
export const imgUrl = (name) => (name ? `${BASE}/uploads/${name}` : 'https://placehold.co/300x200?text=No+Image');

const api = axios.create({ baseURL: `${BASE}/api` });
api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default api;
