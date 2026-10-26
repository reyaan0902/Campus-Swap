import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';
import AddItem from './pages/AddItem';
import ItemDetail from './pages/ItemDetail';
import MyListings from './pages/MyListings';
import Favourites from './pages/Favourites';

function Private({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <p className="center">Loading...</p>;
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/login" element={<Auth mode="login" />} />
          <Route path="/register" element={<Auth mode="register" />} />
          <Route path="/add" element={<Private><AddItem /></Private>} />
          <Route path="/my-listings" element={<Private><MyListings /></Private>} />
          <Route path="/favourites" element={<Private><Favourites /></Private>} />
        </Routes>
      </div>
    </>
  );
}
