import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, User, Search, LogOut } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { cartItems, wishlistItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const keyword = e.target.search.value;
    if (keyword.trim()) {
      navigate(`/search?keyword=${keyword}`);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">ELARIX</Link>
      
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/shop/makeup">Makeup</Link>
        <Link to="/shop/skincare">Skincare</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div className="flex items-center gap-1">
        <form onSubmit={handleSearch} className="flex" style={{ marginRight: '1rem' }}>
          <input 
            type="text" 
            name="search" 
            placeholder="Search..." 
            style={{ padding: '0.3rem 0.8rem', borderRadius: '20px', border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ background: 'none', border: 'none', marginLeft: '-30px' }}>
            <Search size={18} color="#666" />
          </button>
        </form>

        <Link to="/cart" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <ShoppingBag size={24} />
          {cartItems.length > 0 && (
            <span style={{ position: 'absolute', top: -5, right: -10, background: 'var(--primary)', color: 'white', borderRadius: '50%', padding: '2px 6px', fontSize: '10px' }}>
              {cartItems.length}
            </span>
          )}
        </Link>
        
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '10px' }}>
            <span style={{ fontSize: '0.9rem' }}>Hi, {user.name.split(' ')[0]}</span>
            <button onClick={logout} style={{ background: 'none', border: 'none' }} title="Logout">
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <Link to="/login" style={{ marginLeft: '10px' }}><User size={24} /></Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
