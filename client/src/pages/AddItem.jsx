import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function AddItem() {
  const [form, setForm] = useState({ title: '', description: '', price: '', category: 'Textbooks', condition: 'Good' });
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const nav = useNavigate();

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    if (image) data.append('image', image);
    try {
      await api.post('/items', data);
      nav('/my-listings');
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to add item');
    }
  };

  return (
    <form className="card form" onSubmit={submit}>
      <h2>Sell an Item</h2>
      {error && <p className="error">{error}</p>}
      <input name="title" placeholder="Title (e.g. Engineering Maths Vol 1)" onChange={change} required />
      <textarea name="description" rows="3" placeholder="Description" onChange={change} />
      <input name="price" type="number" placeholder="Price ₹" onChange={change} required />
      <select name="category" onChange={change}>
        {['Textbooks', 'Calculators', 'Lab Coats', 'Stationery', 'Electronics', 'Other'].map((c) => <option key={c}>{c}</option>)}
      </select>
      <select name="condition" value={form.condition} onChange={change}>
        {['New', 'Like New', 'Good', 'Fair'].map((c) => <option key={c}>{c}</option>)}
      </select>
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
      <button type="submit">Post Listing</button>
    </form>
  );
}
