import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, wishlistItems } = useContext(CartContext);
  const isWishlisted = wishlistItems.find(x => x.id === product.id);

  return (
    <div className="product-card">
      <button 
        className={`wishlist-btn ${isWishlisted ? 'active' : ''}`} 
        onClick={() => toggleWishlist(product)}
      >
        <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
      </button>
      
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} className="product-image" />
      </Link>
      
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-price">₹{product.price}</p>
        
        <div className="flex justify-between items-center gap-1">
          <button 
            className="btn btn-outline" 
            style={{ padding: '0.5rem', width: '100%', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}
            onClick={() => addToCart(product, 1)}
          >
            <ShoppingBag size={18} /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
