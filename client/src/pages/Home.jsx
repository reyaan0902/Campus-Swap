import { useEffect, useState } from 'react';
import api from '../api';
import ItemCard from '../components/ItemCard';

const CATEGORIES = ['Textbooks', 'Calculators', 'Lab Coats', 'Stationery', 'Electronics', 'Other'];

export default function Home() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [onlyAvailable, setOnlyAvailable] = useState(true);

  useEffect(() => {
    const params = { q, category, maxPrice };
    if (onlyAvailable) params.status = 'available';
    api.get('/items', { params }).then((r) => setItems(r.data));
  }, [q, category, maxPrice, onlyAvailable]);

  return (
    <>
      <div className="filters">
        <input placeholder="Search items..." value={q} onChange={(e) => setQ(e.target.value)} />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All categories</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <input type="number" placeholder="Max price ₹" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
        <label>
          <input type="checkbox" style={{ width: 'auto' }} checked={onlyAvailable}
            onChange={(e) => setOnlyAvailable(e.target.checked)} /> Available only
        </label>
      </div>
      {items.length === 0 ? <p className="center">No items found.</p> : (
        <div className="grid">{items.map((i) => <ItemCard key={i._id} item={i} />)}</div>
      )}
    </>
  );
}
