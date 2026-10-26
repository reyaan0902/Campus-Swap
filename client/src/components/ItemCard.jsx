import { Link } from 'react-router-dom';
import { imgUrl } from '../api';
import { useAuth } from '../context/AuthContext';

export default function ItemCard({ item }) {
  const { user, toggleFav } = useAuth();
  const isFav = user?.favourites?.includes(item._id);

  return (
    <div className="card item">
      {item.status === 'sold' && <span className="sold">SOLD</span>}
      {user && (
        <button className="heart" onClick={() => toggleFav(item._id)}>
          {isFav ? '❤️' : '🤍'}
        </button>
      )}
      <Link to={`/item/${item._id}`}>
        <img src={imgUrl(item.image)} alt={item.title} />
        <div className="info">
          <h4>{item.title}</h4>
          <p className="price">₹{item.price}</p>
          <span className="tag">{item.category}</span> <span className="tag">{item.condition}</span>
        </div>
      </Link>
    </div>
  );
}
