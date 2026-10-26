import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

export default function Auth({ mode }) {
  const isLogin = mode === 'login';
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const nav = useNavigate();

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const r = await api.post(isLogin ? '/auth/login' : '/auth/register', form);
      login(r.data);
      nav('/');
    } catch (err) {
      setError(err.response?.data?.msg || 'Something went wrong');
    }
  };

  return (
    <form className="card form" onSubmit={submit}>
      <h2>{isLogin ? 'Login' : 'Create Account'}</h2>
      {error && <p className="error">{error}</p>}
      {!isLogin && <input name="name" placeholder="Full name" onChange={change} required />}
      <input name="email" type="email" placeholder="College email" onChange={change} required />
      {!isLogin && <input name="phone" placeholder="Phone / WhatsApp number" onChange={change} required />}
      <input name="password" type="password" placeholder="Password" onChange={change} required />
      <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      <p>
        {isLogin ? <>New here? <Link to="/register">Register</Link></> : <>Have an account? <Link to="/login">Login</Link></>}
      </p>
    </form>
  );
}
