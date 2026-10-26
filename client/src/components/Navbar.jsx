import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  return (
    <nav className="navbar">
      <Link to="/" className="brand">🎓 CampusSwap</Link>
      <div className="links">
        <Link to="/">Browse</Link>
        {user ? (
          <>
            <Link to="/add">Sell Item</Link>
            <Link to="/my-listings">My Listings</Link>
            <Link to="/favourites">Favourites</Link>
            <button onClick={() => { logout(); nav('/'); }}>Logout ({user.name})</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
