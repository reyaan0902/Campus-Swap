import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { imgUrl } from '../api';

export default function MyListings() {
  const [items, setItems] = useState([]);
  const load = () => api.get('/items/mine').then((r) => setItems(r.data));
  useEffect(() => { load(); }, []);

  const toggle = async (id) => { await api.put(`/items/${id}/status`); load(); };
  const remove = async (id) => {
    if (window.confirm('Delete this listing?')) { await api.delete(`/items/${id}`); load(); }
  };

  return (
    <>
      <h2 style={{ marginBottom: 16 }}>My Listings</h2>
      {items.length === 0 && <p>You have no listings. <Link to="/add">Add one</Link></p>}
      <div className="grid">
        {items.map((i) => (
          <div key={i._id} className="card item">
            {i.status === 'sold' && <span className="sold">SOLD</span>}
            <img src={imgUrl(i.image)} alt={i.title} />
            <div className="info">
              <h4>{i.title}</h4>
              <p className="price">₹{i.price}</p>
              <div className="row" style={{ marginTop: 8 }}>
                <button className="btn" onClick={() => toggle(i._id)}>
                  Mark {i.status === 'available' ? 'Sold' : 'Available'}
                </button>
                <button className="btn danger" onClick={() => remove(i._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
