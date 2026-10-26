import { useEffect, useState } from 'react';
import api from '../api';
import ItemCard from '../components/ItemCard';
import { useAuth } from '../context/AuthContext';

export default function Favourites() {
  const [items, setItems] = useState([]);
  const { user } = useAuth();

  // refetch whenever favourites change so unliked items disappear
  useEffect(() => {
    api.get('/items/favourites').then((r) => setItems(r.data));
  }, [user.favourites]);

  return (
    <>
      <h2 style={{ marginBottom: 16 }}>❤️ My Favourites</h2>
      {items.length === 0 ? <p>No favourites yet.</p> : (
        <div className="grid">{items.map((i) => <ItemCard key={i._id} item={i} />)}</div>
      )}
    </>
  );
}
