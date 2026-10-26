import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api, { imgUrl } from '../api';
import { useAuth } from '../context/AuthContext';

export default function ItemDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [item, setItem] = useState(null);

  useEffect(() => {
    api.get(`/items/${id}`).then((r) => setItem(r.data)).catch(() => setItem(false));
  }, [id]);

  if (item === null) return <p className="center">Loading...</p>;
  if (item === false) return <p className="center">Item not found.</p>;

  const s = item.seller;
  return (
    <div className="card detail">
      <img src={imgUrl(item.image)} alt={item.title} />
      <div className="text">
        <h2>{item.title} {item.status === 'sold' && <span className="tag">SOLD</span>}</h2>
        <p className="price" style={{ fontSize: 24, color: '#3b3bb3' }}>₹{item.price}</p>
        <p><b>Category:</b> {item.category} | <b>Condition:</b> {item.condition}</p>
        <p>{item.description || 'No description provided.'}</p>
        <hr />
        <h4>Contact Seller</h4>
        <p>👤 {s.name}</p>
        {user ? (
          <div className="row">
            <p>📞 {s.phone}</p>
            <p>✉️ {s.email}</p>
            <a className="btn green" target="_blank" rel="noreferrer"
              href={`https://wa.me/91${s.phone}?text=Hi, I'm interested in your listing "${item.title}" on CampusSwap`}>
              WhatsApp
            </a>
          </div>
        ) : <p>Please login to see contact details.</p>}
      </div>
    </div>
  );
}
